import { dbConnect, closeDBConnection} from "./dbConnect";
import Product from "../models/Product";
import User from "../models/User";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import Address from "../models/Address";
import mongoose from "mongoose";

dotenv.config();
export async function seedDb()
{
    try {
        let result : any = await Product.deleteMany({}).lean();
        console.log(result);
        result = await User.deleteMany({}).lean();
        console.log(result);
        console.log("Cleared Database!");

        result = await Product.insertMany([
            {
                name: "Pink Dream Dress",
                price: 1000.00,
                description: "Rochie rafinată și eleganta. În fata are un decolteu in V ce coboară spre talie, iar spatele este gol. Mânecile sunt ample, în forma de fluture. Materiale folosite sunt mătase naturala și lurex.",
                sizes: ["S", "M", "L"],
                stock: 100,
                category: ["Colectie noua", "New collection"],
                rating: 9.3
            },
            {
                name: "Black Galla",
                price: 1200.00,
                description: "Ținută cocktail, elegantă compusă din corset, fustă și sacou. Corsetul este din dantelă neagră cu inserții de latex. Fustă creion, lungime midi, cu șliț lung rotunjit, într-o parte. Sacou negru, cu guler satinat, la fel precum fusta. Materialele utilizate sunt satin, lână, dantelă.",
                sizes: ["S", "M", "L"],
                stock: 123,
                category: ["Colectie noua", "New collection"],
                rating: 10

            },
            {
                name: "Black Swan",
                price: 1500.00,
                description: "Ținută compusă din corset și fustă cu șliț lung. Corsetul este transparent și are cusut manual pietre semiprețioase. Penele negre din dreptul sânilor crează un impact de extravaganță și feminitate. Fusta este transparenta din mătase fină naturală, amplă, cu un șliț lung într-o parte. Este o ținută perfectă pentru o femeie misterioasă și delicată.",
                sizes: ["S", "M", "L"],
                stock: 23,
                category: ["Colectie noua", "New collection"],
                rating: 9.6
            },
            {
                name: "Lilya Dress",
                price: 1200.00,
                description: "Rochie lila elegantă, mulată și scurtă. Rochia este compusa din doua piese ce pot fi purtate atât separat, cat și împreună. Rochia are în partea de sus, pe corset cusute manual strasuri. Ținuta are o trena detașabilă din mai multe straturi de tiulle. Materialele utilizate sunt lycra și tiulle.",
                sizes: ["S", "M", "L"],
                stock: 157,
                category: ["Colectie noua", "New collection"],
                rating: 9.4
            }
        ]);
        console.log("Added Test Products");
        
        result = await User.insertMany([
            {
                email: "andrei@gmail.com",
                password: await bcryptjs.hash("mihai123", 10),
                firstName: "Andrei",
                lastName: "Mihai",
                admin: true
            },
            {
                email: "johndoe34@gmail.com",
                password: await bcryptjs.hash("fsdf1223", 10),
                firstName: "John",
                lastName: "Doe",
                admin: false
            }
        ]);
        console.log(result);
        console.log("Added Test Users");

    } catch (err) {
        console.error(err);
    }
}

