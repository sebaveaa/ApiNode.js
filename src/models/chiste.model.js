const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Chiste:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         texto: 
 *           type: string
 *           example: I remember when I was a kid, I opened my fridge and noticed one of my vegetables were crying. I guess I have some emotional cabbage.  
 *         autor:
 *           type: string
 *           example: Juancito
 *         puntaje:
 *           type: number
 *           example: 6
 *           minimum: 1
 *           maximum: 10
 *         categoria:
 *           type: string
 *           example: Dad joke
 *           enum:
 *             - Dad joke
 *             - Humor Negro
 *             - Chistoso
 *             - Malo
 */
const ChisteSchema = mongoose.Schema(
    {
        texto:{
            type: String,
            required: true
        },
        autor:{
            type: String,
            require: false,
            default:'Se perdió en el Ávila como Led'
        },
        puntaje:{
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 10
        },
        categoria:{
            type:String,
            enum:['Dad joke','Humor Negro','Chistoso','Malo'],
            required:[true,'Por favor ingresar la categoria']
        }
    },
    {
        timestamps: true
    }
);

const Chiste = mongoose.model("Chiste", ChisteSchema);

module.exports = Chiste;