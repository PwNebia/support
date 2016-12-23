var $ = require('jquery')

var app = app || {
  init: function() {
    app.sectionArticles.init();
    app.homeVideo.init();
    app.homeFAQ.init();
    // app.troubleShooting.init();
  },

  // troubleShooting: {
  //   init: function() {
  //     app.troubleShooting.variables();
  //     app.troubleShooting.listen();
  //   },

  //   variables: function() {
  //     this.$toggles    = $('.article-troubleshooting__item-toggle')
  //     this.toggleClass = '-is-open'
  //   },

  //   listen: function() {
  //     this.$toggles.click($.proxy(app.troubleShooting.toggle, this))
  //   },

  //   toggle: function(event) {
  //     var $clickedToggle   = $(event.currentTarget)
  //     var $selectedSection = $clickedToggle.parent()
  //     $selectedSection.toggleClass(this.toggleClass)
  //   }
  // },

  sectionArticles: {
    init: function() {
      app.sectionArticles.variables();
      app.sectionArticles.listen();
    },

    variables: function() {
      this.$section    = $('.article-sidebar')
      this.$toggle     = $('.section-articles__mobile-toggle')
      this.toggleClass = '-is-open'
    },

    listen: function() {
      this.$toggle.click($.proxy(app.sectionArticles.toggle, this))
    },

    toggle: function(event) {
      this.$section.toggleClass(this.toggleClass)
    }
  },

  homeVideo: {
    init: function() {
      app.homeVideo.variables();
      app.homeVideo.listen();
    },

    variables: function() {
      this.$modal       = $('.modal')
      this.$openVideo   = $('#open-install-video')
      this.$closeVideo  = $('.modal-close-btn')
      this.$video       = this.$modal.find('iframe')
      this.videoSrc     = this.$video.attr('src')
      this.visibleClass = '-is-open'
    },

    listen: function() {
      this.$openVideo.click($.proxy(app.homeVideo.open, this))
      this.$closeVideo.click($.proxy(app.homeVideo.close, this))
    },

    open: function(event) {
      event.preventDefault()
      this.$modal.addClass(this.visibleClass)
      this.$video.attr('src', this.videoSrc)
    },

    close: function(event) {
      this.$modal.removeClass(this.visibleClass)
      this.$video.attr('src', '')
    }
  },

  homeFAQ: {
    init: function() {
      app.homeFAQ.variables();
      app.homeFAQ.listen();
      app.homeFAQ.columnize();
    },

    variables: function() {
      this.$container   = $('.faq__items-container')
      this.$columns     = $('.faq__items')
      this.$questions   = $('.faq__item')
      this.$toggle      = $('.faq__btn')
      this.toggleClass  = '-is-open'
      this.columnsClass = '-is-columns'
    },

    listen: function() {
      this.$container.on('click', '.faq__btn', $.proxy(app.homeFAQ.toggle, this))
    },

    toggle: function(event) {
      var $clickedToggle = $(event.currentTarget)
      $clickedToggle.toggleClass(this.toggleClass)
    },

    columnize: function() {
      var totalQuestions = this.$questions.length
      var questionsPerCol = Math.ceil(totalQuestions / 3)

      for (var i = 1; i <= this.$questions.length; i++) {
        if ((i / questionsPerCol) > 1 && (i / questionsPerCol) <= 2) {
          this.$questions.eq(i - 1).appendTo(this.$columns.eq(1))
        } else if ((i / questionsPerCol) > 2) {
          this.$questions.eq(i - 1).appendTo(this.$columns.eq(2))
        }
      }

      this.$container.addClass(this.columnsClass)
    }
  }
}

$(document).ready(function(){
  app.init();
})