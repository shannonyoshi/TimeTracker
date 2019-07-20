const db = require(".../data/db-config");

module.exports = {
  find,
  findById,
  findByIdWithTasks,
  add,
  update,
  remove
};

async function find(user_id) {
  const categories = await db("categories")
    .where({ user_id: user_id })
    .innerJoin("time-units", "categories.time_unit_id", "time-unit.id")
    .select(
      "category_name as Category",
      "description as Description",
      "time_minutes as Minutes",
      "time-units.unit_name as Frequency"
    );
  if (categories) {
    return categories;
  } else {
    return null;
  }
}

async function findById(cat_id) {
  const category = await db("categories")
    .where({ cat_id: id })
    .first()
    .innerJoin("time-units", "categories.time_unit_id", "time-unit.id")
    .select(
      "category_name as Category",
      "description as Description",
      "time_minutes as Minutes",
      "time-units.unit_name as Frequency"
    );
  if (category) {
    return category;
  } else {
    return null;
  }
}

async function findByIdWithTasks(cat_id) {
  const category = findById(cat_id);
  const allTasks = await db("tasks").where({ category_id: cat_id });
  const tasks = []; //named tasks created by user
  allTasks.forEach(task => {
    if (allTasks.task_name) {
      tasks.push(task);
    }
  });
  return { ...category, tasks };
}

async function add(category) {
  return db("categories")
    .insert(category)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, cat_id) {
  return db("categories")
    .where({ id: cat_id })
    .first()
    .update(changes);
}

function remove(cat_id) {
    return db("categories")
    .where({id: cat_id})
    .del()
    .then(count => {
        if(count>0) {
        return count;
        } else {
            return null
        }
    })
}
