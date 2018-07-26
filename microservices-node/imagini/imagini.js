const express = require("express");
//const sharp   = require("sharp"); // required Visual Studio installed
const app = express();
const r = require("rethinkdb");
const settings = require("./settings");


// Пример установки интервала

setInterval(() => {
    console.log("ping...");
}, 1000);

// Установка интервала для удаления старых фотографий

// setInterval(() => {

//     let expiration = Date.now() - (30 * 86400 * 1000);

//     rethinkdb.table("images").filter((image) => {
//         return image("date_used").lt(expiration);
//     }).delete().run(db);

// }, 3600 * 1000);

r.connect(settings.db, (err, conn) => {

    if (err) {
        throw err;
    }

    const tableName = "images";
    const db = r.db(settings.db.name);

    console.log("db: ready");

    app.listen(3030, () => {
        console.log("app: ready");
    });

    db.tableList().run(conn, function (err, tables) {

        if (!tables){
            // before applying this logic, make sure that database exiists, otherwise table is null
            console.log("Database is missing...");
            return;
        }

        if (!tables.includes(tableName)) {
            console.log("Table doesn't exist. Creating...");

            db.tableCreate(tableName).run(conn, (err, res) => {
                if (err) {
                    console.log("Error creating table");
                    console.log(err.message);
                }
                else {
                    console.log("Table created successfully");
                    console.log(res);
                }
            });
        }
        else {
            console.log("Table already exists. Skipping...");
        }
    });

    // var tableOptions = {
    //     primaryKey: 'id',
    //     durability: 'hard'
    // };

    // equivalent of

    // var table = r.db(settings.db).table(tableName);

    // r.db(settings.db).tableList().contains(tableName).do(r.brach(r.row, table, r.do(function () {
    //     return r.db(settings.db).tableCreate(tableName, tableOptions).do(function () {
    //         return table;
    //     });
    // })));

    // equivalent of 

    // r.db('db_name').ensureTable('table_name', tableOptions);
});