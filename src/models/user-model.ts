import { Singleton } from "../connection/Singleton";
import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * Instanziazione della connessione verso il RDBMS
 */
 const sequelize: Sequelize = Singleton.getConnection();

 /**
  * Definizione dell'ORM attraverso il quale effettuare le query su DB.
  * É stata utilizzata la libreria Sequelize che permette di definire un modello per ogni
  * relazione.
 */ 
 
 export const User = sequelize.define('user', {
     user_id: {
         type: DataTypes.INTEGER,
         primaryKey: true
     },
     email: {
         type: DataTypes.STRING(100),
         allowNull: false
     },
     name: {
         type: DataTypes.STRING(30),
         allowNull: false
     },
     surname: {
         type: DataTypes.STRING(30),
         allowNull: false
     },
     role: {
         type: DataTypes.STRING(5),
         allowNull: false
     },
     token: {
         type: DataTypes.INTEGER,
         allowNull: false
     }
 }, 
 {
     modelName: 'user',
     timestamps: false,
     freezeTableName: true
 });