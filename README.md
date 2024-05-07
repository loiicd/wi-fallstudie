# Supernova AG Projektmanagement Software

## Database SQL Commands
```sql
CREATE TABLE project (
  id text NOT NULL,
  status text NOT NULL,
  title text NOT NULL,
  start_date date,
  end_date date,
  project_lead_id text,
  sub_project_lead_id text,
  short_description text,
  target_description text,
  vision_description text,
  problem_description text,
  PRIMARY KEY (id),
  FOREIGN KEY (project_lead_id) REFERENCES "user" (id),
  FOREIGN KEY (sub_project_lead_id) REFERENCES "user" (id)
)
```

```sql
CREATE TABLE "user" (
  id text NOT NULL,
  firstname text NOT NULL,
  lastname text NOT NULL,
  title text,
  PRIMARY KEY (id)
)
```

```sql
CREATE TABLE project_user_rel (
  project_id text NOT NULL,
  user_id text NOT NULL,
  role text,
  PRIMARY KEY (project_id, user_id),
  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
)
```