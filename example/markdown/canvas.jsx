import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import prism from 'prismjs'
import { transform } from 'babel-standalone'
export default class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n([^]+)```/)

    this.state = {
      showBlock: false
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  componentDidUpdate() {
    this.renderSource(this.source[2])
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource(value) {
    prism.highlightAll()
    import('../../src').then(Element => {
      const args = ['context', 'React', 'ReactDOM']
      const argv = [this, React, ReactDOM]

      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }

      return {
        args,
        argv
      }
    }).then(({ args, argv }) => {
      const code = transform(`
        class Demo extends React.Component {
          ${value}
        }
        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react']
      }).code

      args.push(code)

      new Function(...args).apply(null, argv)

      this.source[2] = value
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    })
  }

  render() {
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
        {
          (
            <div className="meta">
              {
                this.description && (
                  <div
                    ref="description"
                    className="description"
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
              {
                this.state.showBlock && (
                  <div
                    className="dome-code"
                    dangerouslySetInnerHTML={{ __html: marked( this.source[0] ) }}
                  />
                )
              }
              <div className="demo-block-icon" onClick={this.blockControl.bind(this)}>
                {
                  this.state.showBlock ? (
                    <span>
                      <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" className="code-expand-icon-show" />{this.props.locale.hide}
                    </span>
                  ) : (
                    <span>
                      <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" className="code-expand-icon-show" />{this.props.locale.show}
                    </span>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

Canvas.propTypes = {
  locale: PropTypes.object
}

Canvas.defaultProps = {
  locale: {}
}