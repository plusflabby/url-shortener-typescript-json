import { readFileSync, writeFileSync } from "fs";

//thanks Airwarefare (:
export function Get_Data<T>(DB: string, ...keys: string[]): T {
  const data = JSON.parse(
    readFileSync(`${process.cwd()}/src/db/${DB}.json`, "utf-8")
  );
  return keys.reduce((acc, cur) => acc[cur], data) as T;
}

export function Save_Data(DB: string, Data: any, ...keys: string[]): boolean {
  let data: { [key: string]: any } = Get_Data(DB, ...keys);

  if (keys.length < 1) {
    data = { ...Data, ...data };
  }
  //TO DO: SAVE SINGLE POINTS OF DATA

  writeFileSync(
    `${process.cwd()}/src/db/${DB}.json`,
    JSON.stringify(data, null, 4),
    "utf-8"
  );
  return true;
}
