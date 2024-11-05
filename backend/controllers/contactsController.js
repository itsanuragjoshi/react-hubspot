import axios from "axios";

export async function getContacts(req, res) {
  try {
    const limit = 100;
    const nextAfter = req.query.after || null;

    const response = await axios.get(process.env.HUBSPOT_API_CONTACTS, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_ACCESS_TOKEN}`,
      },
      params: {
        limit,
        after: nextAfter,
        archived: false,
        properties: ["firstname", "lastname", "email"],
      },
    });

    const { results: contacts, paging } = response.data;

    const formattedContacts = contacts.map((contact) => {
      const firstName = contact.properties.firstname || "";
      const lastName = contact.properties.lastname || "";
      const fullName = `${firstName} ${lastName}`.trim();

      return {
        fullname: { value: fullName || "" },
        email: { value: contact.properties.email || "" },
      };
    });

    const hasMore = contacts.length === limit;

    res.json({
      contacts: formattedContacts,
      nextAfter: paging?.next?.after || null,
      hasMore,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts from HubSpot" });
  }
}

export async function createContact(req, res) {
  const { email, firstname, lastname } = req.body;

  if (!email || !firstname || !lastname) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const response = await axios.post(
      `${process.env.HUBSPOT_API_CONTACTS}`,
      {
        properties: {
          email,
          firstname,
          lastname,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json({ message: "Contact created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact in HubSpot." });
  }
}
