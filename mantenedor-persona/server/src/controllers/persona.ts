import {Request, Response} from 'express'
import Persona from '../models/persona'

export const getPersonas = async (req: Request, res: Response) => {
    const listPersona =  await Persona.findAll({})
    res.json(listPersona)
}

export const getPersona = async (req: Request, res: Response) => {
    const {rut} = req.params;
    const persona = await Persona.findByPk(rut)

    if(persona){
        res.json(persona)
    } else {
        res.status(404).json({
            msg: `No existe persona con el rut ${rut}`
        });
    }
    
    res.json({
        msg: 'get Persona',
        rut: rut
    })
}

export const deletePersona = async (req: Request, res: Response) => {
    const {rut} = req.params;
    const persona = await Persona.findByPk(rut);
    
    if(!persona) {
        res.status(404).json({
            msg: `No existe persona con el rut ${rut}`
        })
    } else {
        await persona.destroy();
        res.json({
            msg: `Se ha eliminado la persona con el rut ${rut} con exito`
        });
    }
}

export const postPersona = async (req: Request, res: Response) => {
    const {body} = req;
    try {
        await Persona.create(body);

        res.json({
            msg: `Se ha agregado la persona con exito`
        })
    }   catch(error) {
        console.log(error);
        res.json({
            msg: `Ha ocurrido un error`
        })
    }
    
}
export const updatePersona = async (req: Request, res: Response) => {
    const {body} = req;
    const { rut} = req.params;
    
    try {
        const persona = await Persona.findByPk(rut);
    if(persona) {
       await persona.update(body);
       res.json({
        msg: `Se ha actualizado los datos de la persona ${rut}`
    });
    }   else {
        res.status(404).json({
            msg: `No existe persona con el rut ${rut}`
        });
    }
    } catch(error){
        console.log(error);
        res.json({
            msg: `Ha ocurrido un error`
        })
    }
}