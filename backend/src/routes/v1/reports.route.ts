import { Hono } from "hono";
import z from "zod";
import { fetchReport } from "../../controller/reports.controller";
import { FetchReportError, FetchReportFromDBError } from "../../exceptions/reports.exceptions";

const reportsRoute = new Hono();

const FetchReport = z.object({
    reportId: z.string()
})

export type IFetchReport = z.infer<typeof FetchReport>;

reportsRoute.post("/fetch", async (c) => {
    try {
        const validation = FetchReport.safeParse(await c.req.json());
        if(!validation.success){
            throw validation.error;
        }
        const report = await fetchReport(validation.data);
        return c.json({success: true, message: "Report fetched successfully", report}, 200);
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
            return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
        if (error instanceof FetchReportError || error instanceof FetchReportFromDBError){
            return c.json({success: false, message: error.message, error: error.cause}, 500);
        }
        return c.json({success: false, message: "Failed to fetch report", error}, 500);
    }
})

export default reportsRoute;