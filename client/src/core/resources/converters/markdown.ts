import { inject, bindable, autoinject, noView, processContent } from 'aurelia-framework';
import * as commonmark from 'commonmark';
import { Utils } from 'core/Helpers';

@processContent(false)
@noView
@autoinject
@inject(Element)
export class Markdown {
  @bindable value:any;

  element:HTMLInputElement;
  markdown:any;
  reader:any;
  writer:any;

  constructor(element) {
    this.element = element;
    this.element.className += ' markdown-body';
    this.setContent(element.innerHTML || '');

    this.reader = new commonmark.Parser();
    this.writer = new commonmark.HtmlRenderer();
  }

  valueChanged(newValue:string) {
    this.setContent(newValue);
  }

  setContent(markdown:string) {
    markdown = this.fixIndent(markdown);
    markdown = this.fixBlockQuotes(markdown);
    this.element.innerHTML = this.getHtml(markdown);

    this.updateAnchorTargets(this.element);
    this.makeHeadingsLinkable(this.element);
    this.applySyntaxHighlighting(this.element);
  }

  getHtml(markdown:string) {
    return this.writer.render(this.reader.parse(markdown));
  }

  fixIndent(markdown:string) {
    /*
    This is intended to remove indentation that is not really part of
    the markdown, to preserve the ability to indent the markup properly.

    In the example below the total indentation will be reduced by 4 characters.

    |
    |<template>
    |  <markdown>
    |    # hello world
    |
    |    lorem ipsum bla bla
    |
    |        var x = 3;
    |
    |  </markdown>
    |</template>
    |

    */
    var result = /^( +)\S/im.exec(markdown);
    if (result) {
      markdown = markdown.replace(new RegExp('^ {' + result[1].length.toString() + '}', 'gim'), '');
    }
    return markdown;
  }

  fixBlockQuotes(markdown:string) {
    return markdown.replace(/^(\s*)&gt;/gim, (match, p1) => p1 + '>');
  }

  updateAnchorTargets(element:HTMLInputElement) {
    // external links need target="_blank"
    let anchors = element.getElementsByTagName('a');
    for(let i = 0, ii = anchors.length; i < ii; i++) {
      if (!Utils.isExternalLink(anchors[i].href))
        continue;
      anchors[i].target = '_blank';
    }
  }

  makeHeadingsLinkable(element:HTMLInputElement) {
    let headings = element.querySelectorAll('h1,h2,h3,h4,h5,h6');

    for(let i = 0, ii = headings.length; i < ii; i++) {
      let h = headings[i];
      let title = h.textContent;
      let slug = Utils.titleToSlug(title);
      h.id = slug;
      h.innerHTML = `<a id="${slug}" class="anchor" href="#${slug}" aria-hidden="true"><span class="glyphicon glyphicon-link"></span></a>${title}`;
    }
  }

  applySyntaxHighlighting(element:HTMLInputElement) {
    let codes = element.getElementsByTagName('code');

    for(let i = 0, ii = codes.length; i < ii; i++) {
      // don't mess with code elements that are not enclosed in a pre.
      if (codes[i].parentNode.tagName !== 'PRE')
        continue;

      // trim the code to avoid strange appearance with line numbers.
      codes[i].textContent = codes[i].textContent.trim();

      // make sure there's a language-* class.
      if (!/language-/.test(codes[i].className))
        codes[i].className += ' language-javascript';

      // // make sure the parent pre has the line-numbers class.
      // if (!/line-numbers/.test(codes[i].parentNode.className))
      //   codes[i].parentNode.className += ' line-numbers';

      // apply syntax highlighting.
      //Prism.highlightElement(codes[i]);
    }
  }
}
