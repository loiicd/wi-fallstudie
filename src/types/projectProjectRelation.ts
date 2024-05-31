import { User } from './user'
import {Project} from './project'

export type ProjectProjectRelation = {
    id?: string
    project_1: Project | undefined
    project_2: Project | undefined
    relation_name_1_to_2: string
    relation_name_2_to_1: string
    created_at?: string
    created_from: User | undefined
}


export const roleOptions = [
    {id: '0', relation_name_1_to_2: '---', relation_name_2_to_1: '---'},

    {id: '1_1', relation_name_1_to_2: 'blockiert', relation_name_2_to_1: 'wird blockiert von', link_color: 'red'},
    {id: '1_2', relation_name_1_to_2: 'wird blockiert von', relation_name_2_to_1: 'blockiert', link_color: 'red'},

    {id: '2_1', relation_name_1_to_2: 'unterstützt', relation_name_2_to_1: 'wird unterstützt von', link_color: 'green'},
    {id: '2_2', relation_name_1_to_2: 'wird unterstützt von', relation_name_2_to_1: 'unterstützt', link_color: 'green'},

    {id: '3_1', relation_name_1_to_2: 'ist verwandt mit', relation_name_2_to_1: 'ist verwandt mit', link_color: 'blue'},

    {id: '4_1', relation_name_1_to_2: 'ist ein Teil von', relation_name_2_to_1: 'enthält', link_color: 'orange'},
    {id: '4_2', relation_name_1_to_2: 'enthält', relation_name_2_to_1: 'ist ein Teil von', link_color: 'orange'},

    {id: '5_1', relation_name_1_to_2: 'ist ein Vorgänger von', relation_name_2_to_1: 'ist ein Nachfolger von', link_color: 'purple'},
    {id: '5_2', relation_name_1_to_2: 'ist ein Nachfolger von', relation_name_2_to_1: 'ist ein Vorgänger von', link_color: 'purple'},

    {id: '6_1', relation_name_1_to_2: 'dupliziert', relation_name_2_to_1: 'dupliziert', link_color: 'grey'},

    {id: '7_1', relation_name_1_to_2: 'zusammengefügt mit', relation_name_2_to_1: 'zusammengefügt mit', link_color: 'black'},

    {id: '8_1', relation_name_1_to_2: 'verursacht', relation_name_2_to_1: 'verursacht durch', link_color: 'brown'},

    {id: '9_1', relation_name_1_to_2: 'gelöst durch', relation_name_2_to_1: 'löst', link_color: 'yellow'},
]; 
