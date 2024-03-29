import mongoose from "mongoose"

/***
 *  Definition de Schema mongoose.
 *  Export de modele mongoose.
 *  
 */

const userSchema = mongoose.Schema({

    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },

    password: { 
        type: String,
        required: true 
    },

    id: { 
        type: String 
    }
})

export default mongoose.model("User", userSchema);