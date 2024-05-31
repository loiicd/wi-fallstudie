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


/**
 * 
 * CREATE TABLE project_project_relation (
    id text not null,
    project_1_id text not null,
    project_2_id text not null,
    relation_name_1_to_2 text not null,
    relation_name_2_to_1 text not null,
    created_at date,
    created_from text NOT NULL,
    Foreign Key (project_1_id) references project(id),
    Foreign Key (project_2_id) references project(id),
    FOREIGN KEY (created_from) REFERENCES "user" (id))
 
*/