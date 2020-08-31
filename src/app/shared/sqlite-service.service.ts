import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx'
import { Card } from '../models/card';
import { Sets } from '../models/sets';

@Injectable({
  providedIn: 'root'
})



export class SqliteServiceService {
  public db: SQLiteObject
  public labels: string[] = []
  public sets: Sets[] = []
  public viewSet: Card[] = []
  constructor(private _platform: Platform, private _sql: SQLite) { 
    _platform.ready()
    .then(() => {
      const sqlConfig:SQLiteDatabaseConfig = {
        name: "testDatabase.db",
        location: "default"
      }
      _sql.create(sqlConfig)
      .then(db => {
        this.db = db
        // db.sqlBatch((tx)=> {
        //   let sql = 'CREATE TABLE IF NOT EXISTS set (set_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, labels TEXT)'
        //   tx.executeSql(sql,[],r => console.log(JSON.stringify(r)), e => console.log(JSON.stringify(e)))
        //   sql = 'CREATE TABLE IF NOT EXISTS card ( card_id INTEGER PRIMARY KEY AUTOINCREMENT, sideA TEXT NOT NULL, sideB TEXT NOT NULL);'
        //   tx.executeSql(sql,[],r => console.log("created card table"), e => console.log("couldnt create card table"))
        // })
        db.sqlBatch(['CREATE TABLE IF NOT EXISTS sets (sets_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, labels TEXT)', 
        'CREATE TABLE IF NOT EXISTS card ( card_id INTEGER PRIMARY KEY AUTOINCREMENT, sideA TEXT NOT NULL, sideB TEXT, sets_id INTEGER NOT NULL, CONSTRAINT fk_sets FOREIGN KEY (sets_id) REFERENCES sets(sets_id) ON DELETE CASCADE )',
        'CREATE TABLE IF NOT EXISTS label ( label_id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT NOT NULL)'
        ])
      })
      .then(() => {
        this.getLabels()
        this.getSets()
      })


      
    })

  }


  createNewSet(title: string, labels:string[]){
    let stringLabels = labels.toString()
    let sql = `INSERT INTO sets(title, labels) VALUES (?,?)`
    let params = [title, stringLabels]
    return this.db.executeSql(sql,params).then(r => {return r}).catch(e => console.log(JSON.stringify(e)))
  }


  // delete all from card table
  deleteTable(){
    let sql = 'DELETE FROM card;'
    // sql = 'DROP TABLE card'
    return this.db.executeSql(sql).catch(e => console.log(JSON.stringify(e)))
  }


  // insert new card
  insertCard(sideA: string, sideB:string, sets_id: number){
    let sql = 'INSERT INTO card(sideA, sideB, sets_id) VALUES(?,?,?)'
    let params = [sideA, sideB, sets_id]
    return this.db.executeSql(sql, params).then(r => {return r}).catch(e => console.log(JSON.stringify(e)))
  }

  // delete existing card using card_id
  deleteCard(card:Card){
    let sql = 'DELETE FROM card WHERE card_id = ?'
    let params = [card.card_id]
    return this.db.executeSql(sql, params)
    .then(() => {
      this.getSet(card.sets_id)
    })
    .catch(e => console.log(JSON.stringify(e)))
  }

  // get all cards from a set (NOT implemente yet, missing sets_id)
  getCards(){
    let sql = 'SELECT * FROM card'
    return this.db.executeSql(sql,[])
    .then(data => {
      let result = []
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        // do something with it
        let card = new Card
        card = item
        result.push(card);
      }
      return result
    })
    .catch(e => console.log(JSON.stringify(e)))
  }


  // get all sets available and its labels
  getSets(){
    let result = []
    let sql = 'SELECT * FROM sets'
    this.db.executeSql(sql,[])
    .then(data => {
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        // do something with it
        let set = new Sets
        set = item
        result.push(set);
      }
      this.sets = <Sets[]>result
    })
    .catch( e => console.log(JSON.stringify(e)))
  }

  // get cards based on set_id
  getSet(set_id:number){
    let sql = 'SELECT * FROM card WHERE sets_id = ?'
    let params = [set_id]

    return this.db.executeSql(sql, params)
    .then(data => {
      let result:Card[] = []
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        // do something with it
        let card = new Card
        card = item
        result.push(card);
      }
      this.viewSet = result
    })
    .catch(e => console.log(JSON.stringify(e)))
  }

  // update a set with set_id
  updateSet(set:Sets){
    let sql = 'UPDATE sets SET title = ?, labels = ? WHERE sets_id = ?'
    let params = [set.title, set.labels, set.sets_id]
    return this.db.executeSql(sql,params)
    .then(() => {
      this.getSets()
    })
    .catch(e => console.log(JSON.stringify(e)))
  }
  // delete set with set_id
  deleteSet(set_id:number){
    let sql = 'DELETE FROM sets WHERE sets_id = ?'
    let params = [set_id]
    this.db.executeSql(sql, params)
    .then(r => {
      this.getSets()
      console.log(JSON.stringify(r))
    })
    .catch(r => console.log(JSON.stringify(r)))
  }

  // get all available labels
  getLabels(){
    let sql = 'SELECT label FROM label'
    // sql = 'drop table label'
    return this.db.executeSql(sql,[])
    .then(data => {
      let result = []
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        // do something with it
        let set = new Sets
        set = item
        result.push(set);
      }
      this.labels = <string[]>result[0]['label'].split(',')
    })
    .catch( e => console.log("err:", JSON.stringify(e)))
  }

  setLabels(label:string[]){
    let sql = 'INSERT OR REPLACE INTO label(label_id, label) VALUES(?,?)'
    return this.db.executeSql(sql, [1, this.labels.concat(label).toString()])
    .then(r => console.log("Inserted label",JSON.stringify(r)))
    .catch(e => console.log(JSON.stringify(e)))
  }
  updateLabels(){
    let sql = 'INSERT OR REPLACE INTO label(label_id, label) VALUES(?,?)'
    return this.db.executeSql(sql,[1,this.labels.toString()])
    .then(r => null)
    .catch(e => console.log(JSON.stringify(e)))
  }
}
