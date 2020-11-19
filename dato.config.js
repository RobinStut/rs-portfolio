module.exports = (dato, root, i18n) => {

  const validate = (key, value) => {
    const markdown = require("markdown").markdown
    switch (key) {
      case 'author':
        value = markdown.toHTML(value)
        break;
      case 'image':
        value = value.upload.url
        break;
      case 'seoMeta':
        const metaTags = []
        Object.entries(value.value).forEach((seoKey, seoVal) => {
          switch (seoKey) {
            case 'title':
              metaTags.push(`<meta property="og:title" content="${seoVal}">`)
              break;
            case 'description':
              metaTags.push(`<meta property="og:description" content="${seoVal}">`)
              break;
            case 'image':
              metaTags.push(`<meta property="og:image" content="${seoVal}">`)
              break
            default:
              break;
          }
          value = metaTags
        })
        value = ""
        break;
      default:
        break;
    }
    return value
  }


  const stripData = (key, value) => {
    const obj = Object.assign({}, value);

    // delete unneeded values
    delete obj.entity;
    delete obj.itemsRepo;

    return obj
  }

  const convertData = (value) => {

    const obj = {}

    for (let [key, val] of Object.entries(value)) {
      const validatedData = validate(key, val)
      obj[key] = validatedData
    }

    return obj
  }

  const createData = () => {
    const schema = {}

    for (let [key, value] of Object.entries(dato.collectionsByType)) {
      schema[key] = ""

      if (value.length) {
        const arr = []
        value.forEach(val => {
          const strippedData = stripData(key, val)
          arr.push(convertData(strippedData))
        })
        schema[key] = arr
      }
      else {
        const strippedData = stripData(key, value)
        schema[key] = convertData(strippedData)
      }
    }

    root.createDataFile(`.dato/data.json`, "json", schema)

  }

  createData()
};
