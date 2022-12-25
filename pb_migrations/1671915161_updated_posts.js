migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jx3ugdgxm5ev5iv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qet9skfa",
    "name": "active",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jx3ugdgxm5ev5iv")

  // remove
  collection.schema.removeField("qet9skfa")

  return dao.saveCollection(collection)
})
