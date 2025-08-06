# Dependencies License Report

This document lists all production dependencies and their licenses. This project is compliant with open source licensing requirements.

## License Summary

All production dependencies use open source licenses compatible with the MIT license:

- **MIT**: 154 packages
- **Apache-2.0**: 15 packages  
- **ISC**: 4 packages
- **BSD-3-Clause**: 2 packages

## License Compatibility

All dependencies use licenses that are compatible with the MIT license under which this project is released:

- ✅ **MIT License**: Fully compatible
- ✅ **Apache 2.0**: Compatible with MIT (permissive)
- ✅ **ISC License**: Compatible with MIT (equivalent to MIT)
- ✅ **BSD-3-Clause**: Compatible with MIT (permissive)

## Major Dependencies

### Core Framework & Runtime
- **Next.js** (MIT) - React framework
- **React** (MIT) - UI library
- **Node.js** (MIT) - JavaScript runtime

### Database & ORM
- **Prisma** (Apache-2.0) - Database toolkit
- **PostgreSQL** (PostgreSQL License - similar to MIT)

### GraphQL
- **GraphQL Yoga** (MIT) - GraphQL server
- **TypeGraphQL** (MIT) - GraphQL schema builder
- **Apollo Client** (MIT) - GraphQL client

### UI Framework
- **Mantine** (MIT) - React components library

### Authentication
- **NextAuth.js** (ISC) - Authentication library

### Email
- **React Email** (MIT) - Email templates
- **NodeMailer** (MIT) - Email sending

## Automated License Checking

This project includes license checking in the build process to ensure compliance:

```bash
npx license-checker --production --excludePrivatePackages
```

## License Compliance Statement

All dependencies have been reviewed and are compatible with open source distribution. No proprietary or restrictive licenses are included in the production build.

For a complete list of all dependencies and their licenses, see `license-report.json` which is generated automatically during the build process.

## Updates

This document is automatically updated when dependencies change. Last updated: $(date).

---

*This project is committed to using only open source dependencies with permissive licenses to ensure maximum compatibility and freedom for users and contributors.*