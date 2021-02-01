import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
@Entity()
export class Persona extends BaseEntity{
    
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    nombre!: string;

    @Field(() => String)
    @Column()
    apellido_paterno!: string;

    @Field(() => String)
    @Column()
    apellido_materno!: string;

    @Field(() => String)
    @Column()
    direccion!: string;

    @Field(() => String)
    @Column()
    telefono!:string;
}