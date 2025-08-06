import React from 'react'
import { useAuthSession } from '@hooks/useAuthSession'
import { RoleTypes } from '@typings/roles'
import { TermsType } from '@typings/graphql'

export const useUnacceptedTerms = () => {
  const session = useAuthSession()

  const unacceptedTerms = React.useMemo(() => {
    if (!session?.user) {
      return []
    }

    if (session?.user?.role?.key !== RoleTypes.User) {
      return []
    }

    const terms = Object.values(TermsType).filter((key) => {
      const relevantTerm = session?.user?.acceptedTerms?.find((term) => term.terms.key === key)

      return !relevantTerm || new Date(relevantTerm.acceptedAt).getTime() < new Date(relevantTerm.terms.updatedAt).getTime() ||
      relevantTerm.acceptedAt === null
    }, [])

    return (terms || []) as TermsType[]
  }, [session])

  return unacceptedTerms
}
