module.exports = (dato, root, i18n) => {

  const getSchema = (key, value) => {
    const markdown = require( "markdown" ).markdown

    let schema = {}

    switch (key) {
      case 'index':
        let { parallax, content } = value
        parallax = Object.values(parallax).map(x => x.upload.url)

        schema = {
          title: value.title,
          parallax: parallax,
          content: markdown.toHTML(content)
        }
        break;
      case 'contact':
        const { contactDetails, routeDetails, location } = value

        schema = {
          title: value.title,
          contact: contactDetails,
          route: routeDetails,
          location: location
        }
        break;
      default:
        break;
    }
    return schema
  }

  for (let [key, value] of Object.entries(dato.collectionsByType)) {
    root.createDataFile(`src/${key}.json`, "json", getSchema(key, value))
  }

};
