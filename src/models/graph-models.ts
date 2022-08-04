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
    tot_node: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tot_edge: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    modelName: 'grah',
    timestamps: false,
    freezeTableName: true
});