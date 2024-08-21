/** @type { import("drizzle-kit").Config } */
export default {
	schema: "./utils/schema.js",
	dialect: 'postgresql',
	dbCredentials: {
	  url: "postgresql://aimockinterviewer_owner:nX5Kj1yuMDfA@ep-spring-glitter-a50bblxm.us-east-2.aws.neon.tech/aimockinterviewer?sslmode=require",
	}
  };