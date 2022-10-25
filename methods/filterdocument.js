const express = require("express");
require("../db/config");

const filterdocument = new express.Router();

filterdocument.post("/filterdocument", async (req,res) =>{
    const displayButton = req.body.displayButton
    const newList = req.body.docs
    const Documentos = []

    if ((displayButton.b1 != displayButton.b2 && displayButton.b1 != displayButton.b3 && displayButton.b2 == false ) || (displayButton.b2 != displayButton.b1 && displayButton.b2 != displayButton.b3 && displayButton.b1 == false) || (displayButton.b3 != displayButton.b1 && displayButton.b3 != displayButton.b2 && displayButton.b1 == false)){
        for ( let x = 0 ; x < newList.length ; x++)
        {
            // Bautismo
            if(displayButton.b1 && newList[x].Bautismo.b_id != "" && !displayButton.b2 && newList[x].Confirmacion.c_id == "" && !displayButton.b3 && newList[x].Matrimonio.m_id == ""){
                Documentos.push(newList[x])
            }

            // Confirmacion
            else if(displayButton.b2 && newList[x].Confirmacion.c_id != "" && !displayButton.b1 && newList[x].Bautismo.b_id == "" && !displayButton.b3 && newList[x].Matrimonio.m_id == ""){
                Documentos.push(newList[x])
            }

            //Matrimonio
            else if(displayButton.b3 && newList[x].Matrimonio.m_id != "" && !displayButton.b1 && newList[x].Bautismo.b_id == "" && !displayButton.b2  && newList[x].Confirmacion.c_id == ""){
                Documentos.push(newList[x])
            }
        }
    }
    else if ((displayButton.b1 == displayButton.b2 && displayButton.b1 != displayButton.b3) || (displayButton.b1 != displayButton.b2 && displayButton.b1 == displayButton.b3) || (displayButton.b1 == displayButton.b3 && displayButton.b1 != displayButton.b2)){
        for ( let x = 0 ; x < newList.length ; x++)
        {
            // Bautismo con confirmacion
            if((displayButton.b1 == displayButton.b2 && displayButton.b1 != displayButton.b3) && (newList[x].Bautismo.b_id != "" && newList[x].Confirmacion.c_id != "")){
                Documentos.push(newList[x])
                
            }

            // Bautismo con matrimonio
            else if((displayButton.b1 != displayButton.b2 && displayButton.b1 == displayButton.b3) && (newList[x].Bautismo.b_id != "" && newList[x].Matrimonio.m_id != "")){
                Documentos.push(newList[x])
            }

            // Confirmacion con Matrimonio
            else if((displayButton.b1 != displayButton.b3 && displayButton.b2 == displayButton.b3) && (newList[x].Confirmacion.b_id != "" && newList[x].Matrimonio.m_id != "")){
                Documentos.push(newList[x])
            }
        }
    }
    else if (displayButton.b1 == displayButton.b2 && displayButton.b1 == displayButton.b3 && displayButton.b2 == displayButton.b3 ){
        for ( let x = 0 ; x < newList.length ; x++)
        {
            // Bautismo con confirmacion y matrimonio
            if(displayButton.b1 && newList[x].Bautismo.b_id != "" && displayButton.b2 && newList[x].Confirmacion.c_id != "" && displayButton.b3 && newList[x].Matrimonio.m_id != ""){
                Documentos.push(newList[x])
            }
        }
    }

    if(Documentos.length != 0 || displayButton.b1 || displayButton.b2 || displayButton.b3){
        return res.status(200).json({
            docs: Documentos,
        });
    } else {
        return res.status(200).json({
            docs: newList,
        });
    }
    
    
    
})

module.exports = filterdocument;