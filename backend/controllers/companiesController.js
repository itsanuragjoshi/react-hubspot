import axios from "axios";

export async function getCompanies(req, res) {
  try {
    const limit = 500;
    const nextAfter = req.query.after || null;

    const response = await axios.get(process.env.HUBSPOT_API_COMPANIES, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_ACCESS_TOKEN}`,
      },
      params: {
        limit,
        after: nextAfter,
        archived: false,
        properties: ["name", "domain"],
      },
    });

    const { results: companies, paging } = response.data;

    const formattedCompanies = companies.map((company) => {
      return {
        name: { value: company.properties.name || "" },
        domain: { value: company.properties.domain || "" },
      };
    });

    const hasMore = companies.length === limit;

    res.json({
      companies: formattedCompanies,
      nextAfter: paging?.next?.after || null,
      hasMore,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies from HubSpot" });
  }
}
