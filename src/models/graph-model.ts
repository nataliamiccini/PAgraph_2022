import { Singleton } from "../connection/Singleton";
import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * Instanziazione della connessione verso il RDBMS
 */
const sequelize: Sequelize = Singleton.getConnection();
export const Graph = sequelize.define('Graph', {
    id_graph: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    node_a: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    node_b: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    weight_edge: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modify_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    modelName: 'graph',
    timestamps: false,
    freezeTableName: true
});