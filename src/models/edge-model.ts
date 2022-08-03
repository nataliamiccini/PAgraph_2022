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

export const Edge = sequelize.define('edge', {
    id_edge: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    node_a: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    node_b: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    versions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight_edge: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    modify_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    FKuser_id: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    FKid_graph: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'edge',
    timestamps: false,
    freezeTableName: true
});