migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jx3ugdgxm5ev5iv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hux4ypmf",
    "name": "slug",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jx3ugdgxm5ev5iv")

  // remove
  collection.schema.removeField("hux4ypmf")

  return dao.saveCollection(collection)
})
