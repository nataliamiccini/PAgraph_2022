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

export const Graph = sequelize.define('graph', {
    id_graph: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    node_a: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    node_b: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    modelName: 'grah',
    timestamps: false,
    freezeTableName: true
});