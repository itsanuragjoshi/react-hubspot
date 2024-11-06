import axios from "axios";

export async function getTickets(req, res) {
  try {
    const limit = 500;
    const nextAfter = req.query.after || null;

    const response = await axios.get(process.env.HUBSPOT_API_TICKETS, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_ACCESS_TOKEN}`,
      },
      params: {
        limit,
        after: nextAfter,
        archived: false,
        properties: ["hs_pipeline", "hs_pipeline_stage"],
      },
    });

    const { results: tickets, paging } = response.data;

    const formattedTickets = tickets.map((company) => {
      return {
        hs_pipeline: { value: company.properties.hs_pipeline || "" },
        hs_pipeline_stage: {
          value: company.properties.hs_pipeline_stage || "",
        },
      };
    });

    const hasMore = tickets.length === limit;

    res.json({
      tickets: formattedTickets,
      nextAfter: paging?.next?.after || null,
      hasMore,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets from HubSpot" });
  }
}
