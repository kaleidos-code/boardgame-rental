import { PrismaClient } from '@prisma/client'

import { OrderInput } from './dto/OrderInput'
import { FilterInput, FilterOperator, FilterTypes } from './dto/FilterInput'
import { PaginationArgs } from './dto/PaginationArgs'

export class PaginationService {
  constructor (private readonly prisma: PrismaClient) {}

  private getFilterCondition (
    tableName: string,
    filter?: FilterInput[],
    mappedFilterOperators?: Record<string, string>
  ): string {
    let whereClause = ''

    for (const filterItem of filter || []) {
      const operator =
          mappedFilterOperators?.[filterItem.columnAccessor] || filterItem.operator

      const value =
          typeof filterItem.value === 'string'
            ? (filterItem.value as string).trimStart()
            : JSON.stringify(filterItem.value)

      const tabelColumn = `"${tableName}"."${filterItem.columnAccessor}"`

      switch (operator) {
        case FilterOperator.LIKE:
          if (filterItem.type === FilterTypes.SELECT) {
            whereClause += ` AND ${tabelColumn} && ARRAY[${value.replace(/"/g, "'")}]::text[]`
          } else {
            whereClause += ` AND ${tabelColumn} ILIKE '%${value}%'`
          }
          break
        case FilterOperator.NOT_LIKE:
          whereClause += ` AND ${tabelColumn} NOT ILIKE '%${value}%'`
          break
        case FilterOperator.NEQ:
          whereClause += ` AND LOWER(${tabelColumn}) != '${value.toLowerCase()}'`
          break
        case FilterOperator.EQ:
          if (filterItem.type === FilterTypes.DATE) {
            whereClause += ` AND DATE(${tabelColumn}) = '${value}'`
          } else if (filterItem.type === FilterTypes.NUMBER) {
            whereClause += ` AND ${tabelColumn} = ${parseInt(value, 10)}`
          } else if (filterItem.type === FilterTypes.SELECT) {
            whereClause += ` AND ${tabelColumn} = '${value}'`
          } else {
            whereClause += ` AND LOWER(${tabelColumn}) = '${value.toLowerCase()}'`
          }
          break
        case FilterOperator.GT:
          if (filterItem.type === FilterTypes.DATE) {
            whereClause += ` AND DATE(${tabelColumn}) > '${value}'`
          } else {
            whereClause += ` AND ${tabelColumn} > '${value}'`
          }
          break
        case FilterOperator.LT:
          if (filterItem.type === FilterTypes.DATE) {
            whereClause += ` AND DATE(${tabelColumn}) < '${value}'`
          } else {
            whereClause += ` AND ${tabelColumn} < '${value}'`
          }
          break
        case FilterOperator.GTE:
          if (filterItem.type === FilterTypes.DATE) {
            whereClause += ` AND DATE(${tabelColumn}) >= '${value}'`
          } else {
            whereClause += ` AND ${tabelColumn} >= '${value}'`
          }
          break
        case FilterOperator.LTE:
          if (filterItem.type === FilterTypes.DATE) {
            whereClause += ` AND DATE(${tabelColumn}) <= '${value}'`
          } else {
            whereClause += ` AND ${tabelColumn} <= '${value}'`
          }
          break
        case FilterOperator.IS:
          // eslint-disable-next-line no-case-declarations
          const parsedValue =
              value === 'true'
                ? true
                : value === 'false'
                  ? false
                  : value

          whereClause += ` AND ${tabelColumn} IS ${parsedValue}`
          break
        default:
          whereClause += ` AND ${tabelColumn} ${operator} '${value}'`
          break
      }
    }
    return whereClause.replace(/^ AND /, '')
  }

  getOrderCondition (orderBy?: OrderInput[]): string {
    if (!orderBy || orderBy.length === 0) {
      return ''
    }

    return orderBy
      .map(
        order => `"${order.columnAccessor}" ${order.direction.toUpperCase()}`
      )
      .join(', ') + `, "id" ${orderBy[0].direction.toUpperCase()}`
  }

  async getPaginatedResponse<T, K extends { id: string }> (
    tableProps: {
        table: string;
        tableName: string;
        hasSoftDelete?: boolean;
        mappedFilterOperators?: Record<string, string>;
        additionalWhere?: string;
      },
    args: PaginationArgs,
    orderBy?: OrderInput[],
    filter?: FilterInput[]
  ): Promise<T> {
    const { table, tableName, hasSoftDelete, mappedFilterOperators, additionalWhere } =
      tableProps
    const { limit, offset, initialPaginationDate } = args

    const initialPaginationDateValue = initialPaginationDate || new Date()

    const whereClause = this.getFilterCondition(
      tableName,
      filter,
      mappedFilterOperators
    )

    const orderClause = this.getOrderCondition(orderBy)

    const joinedWhereClause = `
      ${hasSoftDelete ? `"${tableName}"."deletedAt" IS NULL` : ''}
      ${whereClause ? `${hasSoftDelete ? ' AND ' : ''} ${whereClause}` : ''}
      ${hasSoftDelete || whereClause ? ' AND ' : ''}
      ${additionalWhere ? `${additionalWhere} AND ` : ''}
      "${tableName}"."createdAt" < '${initialPaginationDateValue.toISOString()}'
    `

    const skipClause = offset ? `OFFSET ${offset}` : ''

    const query = `
      ${table}
      SELECT
        * FROM "${tableName}"
        WHERE
        ${joinedWhereClause}
      ORDER BY 
        ${
          orderClause || '"id" ASC'
        }
      ${skipClause}
      LIMIT ${limit || 10};
    `
    const totalCountQuery = `
      ${table}
      SELECT COUNT(*)::integer FROM "${tableName}"
      WHERE
        ${joinedWhereClause}
        ;
    `
    const nodes = await this.prisma.$queryRawUnsafe<K[]>(query)
    const totalCount = await this.prisma.$queryRawUnsafe(totalCountQuery) as any

    return {
      totalCount: parseInt(totalCount[0].count),
      pageInfo: {
        currentPage: Math.floor(offset / limit) + 1,
        perPage: limit,
        totalPages: Math.ceil(totalCount[0].count / limit)
      },
      nodes
    } as T
  }
}
