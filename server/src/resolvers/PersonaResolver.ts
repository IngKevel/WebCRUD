import {Resolver, Query, Mutation, Arg, Field, InputType, Int} from "type-graphql";
import {Persona} from "../entity/Persona";

@InputType()
class PersonaInput {
    @Field()
    nombre!: string;

    @Field()
    apellido_paterno!: string;

    @Field()
    apellido_materno!: string;

    @Field()
    direccion!: string;

    @Field()
    telefono!: string;
}

@InputType()
class PersonaUpdateInput {
    @Field(() => String, {nullable: true})
    nombre?: string;

    @Field(() => String, {nullable: true})
    apellido_paterno?: string;

    @Field(() => String, {nullable: true})
    apellido_materno?: string;

    @Field(() => String, {nullable: true})
    direccion?: string;

    @Field(() => String, {nullable: true})
    telefono?: string;
}

@Resolver()
export class PersonaResolver {

    @Mutation(() => Persona)
    async createPersona(
        @Arg("datos", () => PersonaInput) datos: PersonaInput
    ){
        const newPersona = Persona.create(datos);
        return await newPersona.save();
    }

    @Mutation(() => Boolean)
    async deletePersona(@Arg("id", () => Int) id: number) {
        await Persona.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updatePersona(
        @Arg("id", () => Int ) id: number,
        @Arg("fields", () => PersonaUpdateInput) fields: PersonaInput)
        {
            await Persona.update({id}, fields);
            return true;
    }

    @Query(() => [Persona])
    personas(){
        return Persona.find();
    }

    @Query(() => [Persona])
    async getPersona(
        @Arg("nombre", () => String) nombre: string,
        @Arg("apellido_paterno", () => String) apellido_paterno: string,
        @Arg("apellido_materno", () => String) apellido_materno: string
    ){
        const getUser = Persona.find({where:[
            { nombre },
            { apellido_paterno },
            { apellido_materno }
        ]});
        return await getUser;
    }
}