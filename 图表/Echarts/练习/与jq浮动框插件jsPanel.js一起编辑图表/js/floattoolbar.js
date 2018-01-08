var tb2 = '<i class="fa fa-user"></i> /* some more items */ <span class="fa fa-remove"></span>';
$.jsPanel({
    theme:        'darkslateblue filled',
    contentSize:  {width: 475, height: 50},
    headerRemove: true,
    resizeit:     false,
    dragit:       {handles: 'div.jsPanel-content'},
    content:      tb2,
    callback:     function(panel) {
        // added close icon handler
        $('span.fa-remove', panel.content).on( 'click', function() {panel.close();} );
        panel.content.css('cursor', 'move');
    }
}).content.addClass('horizontal-toolbar');