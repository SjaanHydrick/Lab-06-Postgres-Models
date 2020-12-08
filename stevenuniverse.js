const pool = require('./lib/utils/pool');

module.exports = class StevenUniverse {
    id;
    name;
    weapon;
    species;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.weapon = row.weapon;
      this.species = row.species;
    }

    static async insert({ name, weapon, species }) {
      const { rows } = await pool.query(
        'INSERT INTO stevenuniverse (name, weapon, species) VALUES ($1, $2, $3) RETURNING *', [name, weapon, species]
      );

      return new StevenUniverse(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM stevenuniverse');

      return rows.map(row => new StevenUniverse(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM stevenuniverse WHERE id=$1', [id]);

      if(!rows[0]) throw new Error(`No Steven Universe characters with id ${id}`);
      return new StevenUniverse(rows[0]);
    }

    static async update(id, { name, weapon, species }) {
      const { rows } = await pool.query(
        'UPDATE stevenuniverse SET name=$1, weapon=$2, url=$3 WHERE id=$4 RETURNING *', [name, weapon, species, id]
      );

      return new StevenUniverse(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM stevenuniverse WHERE id=$1 RETURNING *', [id]);

      return new StevenUniverse(rows[0]);
    }
};
