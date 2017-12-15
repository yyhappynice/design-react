import Markdown from '../../markdown'

export default class Home extends Markdown {
  document() {
    return require('./doc.md')
  }
}