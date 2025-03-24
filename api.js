const API_KEY = "$2a$10$hD20YlzI1bEJMqaE.tDxd.imtTczoppQFIcla6eeIb41HJAHJZ1wK";
const BIN_ID = "67e0efc58960c979a5773b4a";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Fetch User Data
async function getUsers() {
    const response = await fetch(BIN_URL, {
        headers: { "X-Master-Key": API_KEY }
    });
    const data = await response.json();
    return data.record.users;
}

// Update User Data
async function updateUsers(users) {
    await fetch(BIN_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ users })
    });
}
