// FILE SYSTEM + READ LINE MODULES
const fs = require("fs"),
    rl = require("readline");

// FILE STREAM
const reader = rl.createInterface({
    input: fs.createReadStream("users.csv")
});
const headers = {};

const readCSV = async () => {
    // READ LINE-BY-LINE INTO ARRAY
    const users = [];
    reader.on("line", (row) => {
        users.push(row.split(",").map(line => line.trim().split(" ")[0]));
        // console.log(users);
    });

    return users;
}

const saveToFile = async (users) => {
    let csv = "";
    reader.on("close", () => {

        for (let index = 1; index < users.length; index++) {
            csv += users[index].join(",") + "\r\n";
        }

        fs.writeFileSync("output.csv", csv);
    });

    return users
}

const saveJsonFile = async (users) => {
    // WRITE TO JSON AND OUTPUT
    let json = "{\n\t";
    reader.on("close", () => {
        for (let index = 1; index < users.length; index++) {
            json += `"${index}":{\n\t\t`
            for (let values = 0; values < users[index].length; values++) {
                // console.log(attribute)
                json += `"${users[0][values]}": "${users[index][values]}"`
                if (values !== users[index].length - 1) {
                    json += ",\n\t\t"

                }
            }
            if (index !== users.length - 1) {
                json += "\n\t},\n\t"
            }
            else {
                json += "\n\t}\n\t"
            }
        }
        json += '\n}'
        fs.writeFileSync("output.json", json);
    });

}

readCSV().then(saveToFile).then(saveJsonFile)

// (B) TO CSV STRING
