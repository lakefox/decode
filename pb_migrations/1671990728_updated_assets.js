migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("07s58p2mozhdiex")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rxbwvvpx",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("07s58p2mozhdiex")

  // remove
  collection.schema.removeField("rxbwvvpx")

  return dao.saveCollection(collection)
})
