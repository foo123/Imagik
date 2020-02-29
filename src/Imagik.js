/**
*
*    Imagik Responsive CSS3 Slideshow
*    version 1.0.0
*    https://github.com/foo123/Imagik
*
**/
!function(root, factory){
"use strict";
if (typeof define === 'function' && define.amd) define(factory);
else root.Imagik = factory();
}('undefined' !== typeof self ? self : this, function( ){
"use strict";

var stdMath = Math, prop_re = /(?:X\()(\w+)(?:\))/g, expr_re = /(?:\$\()([^\(\)]+)(?:\))/g,
    toString = Object.prototype.toString,
    HAS = Object.prototype.hasOwnProperty,
    slice = Array.prototype.slice;

function ID( )
{
    if ( null == ID.N ) ID.N = 0;
    return ++ID.N;
}
function is_string( x )
{
    return (x instanceof String) || ('[object String]'===toString.call(x));
}
function is_array( x )
{
    return (x instanceof Array) || ('[object Array]'===toString.call(x));
}
function is_obj( x )
{
    return /*(x instanceof Object) ||*/ ('[object Object]'===toString.call(x));
}
function debounce( fn, delay )
{
    var timer = null;
    return function( ) {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}
function extend( o1, o2 )
{
    for(var k in o2)
    {
        if ( !HAS.call(o2, k) ) continue;
        if ( is_array(o2[k]) )
            o1[k] = extend(is_array(o1[k]) ? o1[k] : new Array(o2[k].length), o2[k]);
        else if ( is_obj(o2[k]) )
            o1[k] = extend(is_obj(o1[k]) ? o1[k] : {}, o2[k]);
        else
            o1[k] = o2[k];
    }
    return o1;
}
function $el( htmlString )
{
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}
function $ev( el, evt, handler, add )
{
    if ( false===add ) el.removeEventListener(evt, handler, false);
    else el.addEventListener(evt, handler, false);
    return el;
}
function $$( sel, el )
{
    return slice.call((el || document).querySelectorAll(sel));
}
function $attr( el, key, value )
{
    if ( 2 < arguments.length )
    {
        el.setAttribute(key, value);
        return el;
    }
    return el ? el.getAttribute(key) : null;
}
function $html( el, html )
{
    if ( 1 < arguments.length )
    {
        el.innerHTML = String(html).trim();
        return el;
    }
    return el ? el.innerHTML : '';
}
function $empty( el )
{
    //el.innerHTML = '';
    while(el.firstChild) $remove(el.firstChild);
    return el;
}
function $append( el, child )
{
    return el.appendChild(child);
}
function $remove( child )
{
    return child && child.parentNode ? child.parentNode.removeChild(child) : child;
}
function $addClass( el, klass )
{
    el.classList.add(klass);
    return el;
}
function $removeClass( el, klass )
{
    el.classList.remove(klass);
    return el;
}
function $hasClass( el, klass )
{
    return el.classList.contains(klass);
}
function $style( style, csstext )
{
    if ( style.styleSheet ) style.styleSheet.cssText = csstext;
    else $append($empty(style), document.createTextNode(csstext));
    return style;
}
function $css( obj, style )
{
    var s = '', k, sk;
    if ( style )
    {
        for(k in obj)
        {
            if ( !HAS.call(obj, k) ) continue;
            sk = k.replace(/\-([a-zA-Z])/g, function(m0, m1){return m1.toUpperCase();});
            style[sk] = obj[k];
        }
        return style;
    }
    else
    {
        for(k in obj)
        {
            if ( !HAS.call(obj, k) ) continue;
            s += "\n" + k + ':' + obj[k] + ';';
        }
        return s;
    }
}
function evaluate( poly, x )
{
    // Horner scheme to evaluate polynomial given by coefficients poly from 0 to n-1
    var n = b.length, px;
    if ( !n ) return 0;
    px = poly[--n];
    while( 0 < n ) { px *= x; px += poly[--n]; }
    return px;
}
function linearArray( howmany )
{
    var a = new Array(howmany), i;
    for(i=0;i<howmany;i++) a[i] = i;
    return a;
}
function shuffle( a )
{
    //v1.0
    for(var j, x, i = a.length; i; j = ~~(stdMath.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    return a;
}
function rows( pieces, rowsi, columnsi )
{
    var delays = new Array(rowsi*columnsi), i, j;
    for(i=0;i<columnsi;i++)
    {
        for(j=0;j<rowsi;j++)
        {
            delays[i*rowsi+j] = j;
        }
    }
    return {pieces:pieces, delays:delays, groups:rowsi};
}
function rowsReverse( pieces, rowsi, columnsi )
{
    var delays = new Array(rowsi*columnsi), i, j;
    for(i=0;i<columnsi;i++)
    {
        for(j=0;j<rowsi;j++)
        {
            delays[i*rowsi+j] = rowsi-1-j;
        }
    }
    return {pieces:pieces, delays:delays, groups:rowsi};
}
function columns( pieces, rowsi, columnsi )
{
    var delays = new Array(rowsi*columnsi), i, j;
    for(i=0;i<columnsi;i++)
    {
        for(j=0;j<rowsi;j++)
        {
            delays[i*rowsi+j] = i;
        }
    }
    return {pieces:pieces, delays:delays, groups:columnsi};
}
function columnsReverse( pieces, rowsi, columnsi )
{
    var delays = new Array(rowsi*columnsi), i, j;
    for(i=0;i<columnsi;i++)
    {
        for(j=0;j<rowsi;j++)
        {
            delays[i*rowsi+j] = columnsi-1-i;
        }
    }
    return {pieces:pieces, delays:delays, groups:columnsi};
}
function columnsFirst( pieces, rows, columns )
{
    return({pieces:pieces,delays:linearArray(pieces.length),groups:pieces.length});
}
function columnsFirstReverse( pieces, rows, columns )
{
    var o = columnsFirst(pieces,rows,columns);
    return {pieces:o.pieces.reverse(),delays:o.delays,groups:o.groups};
}
function rowsFirst( pieces, rows, columns)
{
    var newpieces = new Array(rows*columns), i, j;
    for(i=0; i<rows; i++)
    {
        for(j=0;j<columns;j++)
        {
            newpieces[i*columns+j] = pieces[j*rows+i];
        }
    }
    return {pieces:newpieces,delays:linearArray(pieces.length),groups:pieces.length};
}
function rowsFirstReverse( pieces, rows, columns )
{
    var o = rowsFirst(pieces,rows,columns);
    return {pieces:o.pieces.reverse(),delays:o.delays,groups:o.groups};
}
function spiral( pieces, rows, columns, type)
{
    var temp = [], i = 0, j = 0, order = [0,1,2,3], min_i = 0, min_j = 0, max_i = rows-1, max_j = columns-1, dir = 1, mode = 0, inc = true;
    switch( type&3 )
    {
        case 1: i = min_i;
                j = max_j;
                order = [2,1,0,3];
                dir = -1;
                break;
        case 2: i = max_i;
                j = min_j;
                order = [0,3,2,1];
                dir = -1;
                break;
        case 3: i = max_i;
                j = max_j;
                order = [2,3,0,1];
                dir = 1;
                break;
        default: i = min_i;
                j = min_j;
                order = [0,1,2,3]; // 0=>,  1=\/, 2=<, 3=/\
                dir=1;
                break;
    }
    while( (max_i>=min_i) && (max_j>=min_j) )
    {
        if ( inc ) temp.push(pieces[j*rows+i]);
        inc = true;
        switch( order[mode] )
        {
            case 0: // left to right
                if ( j>=max_j )
                {
                    mode = (mode+1)&3;
                    inc = false;
                    if ( dir==1 )
                        min_i++;
                    else
                        max_i--;
                }
                else
                    j++;
                break;
            case 1: // top to bottom
                if ( i>=max_i )
                {
                    mode = (mode+1)&3;
                    inc = false;
                    if ( dir==1 )
                        max_j--;
                    else
                        min_j++;
                }
                else
                    i++;
                break;
            case 2: // right to left
                if ( j<=min_j )
                {
                    mode = (mode+1)&3;
                    inc = false;
                    if ( dir==1 )
                        max_i--;
                    else
                        min_i++;
                }
                else
                    j--;
                break;
            case 3:  // bottom to top
                if ( i<=min_i )
                {
                    mode = (mode+1)&3;
                    inc = false;
                    if ( dir==1 )
                        min_j++;
                    else
                        max_j--;
                }
                else
                    i--;
                break;
        }
    }
    if ( type>=4 ) temp = temp.reverse();
    return {pieces:temp,delays:linearArray(temp.length),groups:temp.length};
}
function spiralTopLeft( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,0);
}
function spiralTopRight( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,1);
}
function spiralBottomLeft( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,2);
}
function spiralBottomRight( pieces, rows, columns)
{
    return spiral(pieces,rows,columns,3);
}
function spiralTopLeftReverse( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,4);
}
function spiralTopRightReverse( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,5);
}
function spiralBottomLeftReverse( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,6);
}
function spiralBottomRightReverse( pieces, rows, columns )
{
    return spiral(pieces,rows,columns,7);
}
function upDown( pieces, rows, columns )
{
    var newpieces = new Array(rows*columns), odd = false, i, j;
    for(i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            newpieces[i*rows+j]= odd ? pieces[i*rows+rows-1-j] : pieces[i*rows+j];
        }
        odd = !odd;
    }
    return {pieces:newpieces,delays:linearArray(pieces.length),groups:pieces.length};
}
function upDownReverse( pieces, rows, columns )
{
    var o = upDown(pieces,rows,columns);
    return {pieces:o.pieces.reverse(),delays:o.delays,groups:o.groups};
}
function leftRight( pieces, rows, columns )
{
    var newpieces = new Array(rows*columns), odd = false, i, j;
    for(i=0;i<rows;i++)
    {
        for(j=0;j<columns;j++)
        {
            newpieces[i*columns+j] = odd ? pieces[(columns-1-j)*rows+i] : pieces[j*rows+i];
        }
        odd = !odd;
    }
    return {pieces:newpieces,delays:linearArray(pieces.length),groups:pieces.length};
}
function leftRightReverse( pieces, rows, columns )
{
    var o = leftRight(pieces,rows,columns);
    return {pieces:o.pieces.reverse(),delays:o.delays,groups:o.groups};
}
function random( pieces, rows, columns )
{
    return {pieces:shuffle(pieces),delays:linearArray(pieces.length),groups:pieces.length};
}
function diagonalTopLeft( pieces, rows, columns )
{
    var delays = new Array(rows*columns), i, j;
    for(i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[i*rows+j] = i+j;
        }
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function diagonalBottomRight( pieces, rows, columns )
{
    var delays = new Array(rows*columns), i, j;
    for(i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[i*rows+j] = columns-1-i+rows-1-j;
        }
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function diagonalBottomLeft( pieces, rows, columns )
{
    var delays = new Array(rows*columns), i, j;
    for(i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[i*rows+j] = i+rows-1-j;
        }
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function diagonalTopRight( pieces, rows, columns )
{
    var delays = new Array(rows*columns), i, j;
    for(i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[i*rows+j] = columns-1-i+j;
        }
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function checkerBoard( pieces, rows, columns )
{
    var delays = new Array(rows*columns), i, j, odd1 = false, odd2;
    for(i=0;i<columns;i++)
    {
        odd2 = odd1;
        for(j=0;j<rows;j++)
        {
            delays[i*rows+j] = odd2 ? 1 : 0;
            odd2 = !odd2;
        }
        odd1 = !odd1;
    }
    return {pieces:pieces, delays:delays, groups:2};
}
function tiles( img, rows, columns, W, H )
{
        var i, j, x, y, bx, by, w = 1===columns ? 100 : (W/columns*101/W), h = 1===rows ? 100 : (H/rows*101/H),
            pieces = new Array(rows*columns), tile;
    for(i=0;i<columns; i++)
    {
        for(j=0; j<rows; j++)
        {
            x = w/columns*i*100/w; y = h/rows*j*100/h;
            bx = -W/columns*i; by = -H/rows*j;
            pieces[i*rows+j] = {piece:tile=$el('<div class="imagik-tile"></div>'), r:rows, c:columns, i:i, j:j, x:x, y:y, bx:bx, by:by, w:w, h:h, W:W, H:H, img:img};
            tile.style.backgroundImage = 'url("'+String(img)+'")';
            tile.style.backgroundPosition = String(bx)+'px '+String(by)+'px';
            tile.style.backgroundSize = String(W)+'px auto';
        }
    }
    return pieces;
}
function destroy( pieces )
{
    if ( !pieces ) return pieces;
    for(var p=0;p<pieces.length;p++)
    {
        if ( pieces[p].piece )
        {
            $empty(pieces[p].piece);
            $remove(pieces[p].piece);
            pieces[p].piece = null;
        }
        pieces[p] = null;
    }
    pieces = null;
    return pieces;
}
function translate( where, what )
{
    if ( is_string(where) )
    {
        where = where.replace(prop_re, function(m0, m1){
            return HAS.call(what, m1) ? String(what[m1]) : m0;
        });
        where = where.replace(expr_re, function(m0, m1){
            var evaluator;
            try {
                evaluator = new Function('', 'return String('+m1+');');
            } catch(err) {
                console.warn('Imagik: Error in expression "'+m0+'", '+err.toString());
                evaluator = function(){return '0';};
            }
            return evaluator();
        });
    }
    else
    {
        for(var n in where)
        {
            if ( HAS.call(where, n) )
                where[n] = translate(where[n], what);
        }
    }
    return where;
}
function hook( id, handler )
{
    if ( false === handler )
    {
        delete hook.handlers[id];
    }
    else if ( "function" === typeof handler )
    {
        hook.handlers[id] = handler;
        if ( !hook.hooked )
        {
            // global window resize handler for all slideshow instances
            $ev(window, 'resize', debounce(function(evt){
                for(var id in hook.handlers)
                {
                    if ( !HAS.call(hook.handlers, id) || ("function" !== typeof hook.handlers[id]) ) continue;
                    hook.handlers[id](evt);
                }
            }, 100));
            hook.hooked = true;
        }
    }
}
hook.handlers = {};
hook.hooked = false;

function Imagik( el, options )
{
    var self = this;
    if ( !(self instanceof Imagik) ) return new Imagik(el, options);

    var defaults = {
        aspectRatio: 1.0,
        transition: "random",
        ease: "linear",
        order: "random",
        rows: 1,
        columns: 1,
        overlap: 0.9,
        duration: 2,
        delay: 5,
        randomOrder: false,
        caption: true,
        controls: true,
        imgs: null
    };

    options = extend(defaults, options||{});
    if ( !options.aspectRatio ) options.aspectRatio = 1.0;
    options.rows = stdMath.max(1, options.rows);
    options.columns = stdMath.max(1, options.columns);
    options.overlap = stdMath.max(0.0, stdMath.min(1.0, options.overlap));
    options.duration = stdMath.max(0.0, options.duration);
    options.delay = stdMath.max(0.0, options.delay);

    self.id = ID();
    self.el = el;
    self.options = options;
    self.style = $el('<style id="imagik-css-'+self.id+'" type="text/css" media="all"></style>');
    $append(self.style, document.createTextNode(''));
    $append(document.head, self.style);

    // global vars
    var holder, caption, controls, thisimg, nextimg, imgs = [], fx = [], captions = [], ind = [],
        current = -1, prevcurrent = -1, timer, dotimer = true, paused = false, p = null, p2 = null,
        numpiec = 0, style = '', lastfx = null, evtCarrier = null, W, H,
        randtrans = shuffle(Imagik.Static.randomTransitions.slice()), randindex = 0,
        getRandomTransition, toggleActive, prepareTransition, clearPrev, endHandler, endTransition
    ;

    self.init = function( ) {
        if ( !self.el || $$('.imagik-holder', self.el).length ) return self;

        W = stdMath.round(self.el.clientWidth); H = stdMath.round(W/self.options.aspectRatio);
        holder = $el('<div class="imagik-holder"></div>');
        holder.style.width = String(W)+'px';
        holder.style.height = String(H)+'px';

        // resize handler
        hook(self.id, function(evt){
            W = stdMath.round(self.el.clientWidth); H = stdMath.round(W/self.options.aspectRatio);
            holder.style.width = String(W)+'px';
            holder.style.height = String(H)+'px';
            thisimg.style.backgroundSize = String(W)+'px auto';
        });

        // parse dom data
        slice.call(self.el.children).forEach(function( div ) {
            if ( !div.tagName || 'DIV' !== div.tagName ) return;
            var klass, thisfx = {}, i, data, kv;
            thisfx.transition = self.options.transition;
            thisfx.delay = self.options.delay;
            thisfx.ease = self.options.ease;
            thisfx.order = self.options.order;
            thisfx.rows = self.options.rows;
            thisfx.columns = self.options.columns;
            thisfx.overlap = self.options.overlap;
            thisfx.duration = self.options.duration;
            klass = $attr(div, 'class');
            if (klass!="" && klass!=null)
            {
                data = klass.split(" ");
                for(i=0;i<data.length;i++)
                {
                    kv = data[i].trim().split("=");
                    if ( 2 <= kv.length ) thisfx[kv[0].trim()] = kv[1].trim();
                }
                thisfx.rows = stdMath.max(1, parseInt(thisfx.rows, 10));
                thisfx.columns = stdMath.max(1, parseInt(thisfx.columns, 10));
                thisfx.overlap = stdMath.max(0.0, stdMath.min(1.0, parseFloat(thisfx.overlap, 10)));
                thisfx.duration = stdMath.max(0.0, parseFloat(thisfx.duration, 10));
                thisfx.delay = stdMath.max(0.0, parseFloat(thisfx.delay, 10));
            }
            imgs.push($attr($$('img', div)[0], 'src'));
            fx.push(thisfx);
            captions.push($html($$('div', div)[0]).trim());
            $remove(div);
        });

        // add options data
        if ( is_array(self.options.imgs) )
        {
            self.options.imgs.forEach(function(img){
                if ( !img || !img.src ) return;
                var thisfx = {};
                thisfx.transition = img.transition!=null ? img.transition : self.options.transition;
                thisfx.ease = img.ease!=null ? img.ease : self.options.ease;
                thisfx.order = img.order!=null ? img.order : self.options.order;
                thisfx.rows = img.rows!=null ? img.rows : self.options.rows;
                thisfx.columns = img.columns!=null ? imgs.columns : self.options.columns;
                thisfx.overlap = img.overlap!=null ? img.overlap : self.options.overlap;
                thisfx.duration = img.duration!=null ? img.duration : self.options.duration;
                thisfx.delay = img.delay!=null ? img.delay : self.options.delay;

                thisfx.rows = stdMath.max(1, parseInt(thisfx.rows, 10));
                thisfx.columns = stdMath.max(1, parseInt(thisfx.columns, 10));
                thisfx.overlap = stdMath.max(0.0, stdMath.min(1.0, parseFloat(thisfx.overlap, 10)));
                thisfx.duration = stdMath.max(0.0, parseFloat(thisfx.duration, 10));
                thisfx.delay = stdMath.max(0.0, parseFloat(thisfx.delay, 10));

                imgs.push(img.src);
                fx.push(thisfx);
                captions.push(img.caption!=null ? String(img.caption).trim() : '');
            });
        }

        $append(self.el, holder);

        thisimg = $el('<div class="imagik-thisimg"></div>');
        thisimg.style.zIndex = 2;
        thisimg.style.backgroundSize = String(W)+'px auto';
        nextimg = $el('<div class="imagik-nextimg"></div>');
        nextimg.style.zIndex = 1;
        nextimg.style.backgroundSize = String(W)+'px auto';
        $append(holder, thisimg);
        $append(holder, nextimg);

        var i, anc, prevBt, nextBt, playBt, bullets, buttons;

        if ( self.options.caption )
        {
            caption = $el('<div class="imagik-caption"></div>');
            $append(holder, caption);
        }
        if ( self.options.controls )
        {
            controls = $el('<div class="imagik-controls"></div>');
            $append(controls, bullets=$el('<div class="bullets"></div>'));
            $append(controls, buttons=$el('<div class="controls"></div>'));
            $append(holder, controls);

            prevBt = $el('<a class="prev" href="javascript:void(0)" title="Previous"></a>');
            nextBt = $el('<a class="next" href="javascript:void(0)" title="Next"></a>');
            playBt = $el('<a class="play-pause" href="javascript:void(0)" title="Play/Pause"></a>');
            $append(buttons, prevBt);
            $append(buttons, playBt);
            $append(buttons, nextBt);
            $ev(prevBt, 'click', function( evt ) {
                if ( paused ) return;
                self.prevTransition();
            });
            $ev(nextBt, 'click', function( evt ) {
                if ( paused ) return;
                self.nextTransition();
            });
            $ev(playBt, 'click', function( evt ) {
                paused = !paused;
                if ( paused )
                {
                    self.stopPlay();
                    $addClass(playBt, 'paused');
                }
                else
                {
                    self.resumePlay();
                    $removeClass(playBt, 'paused');
                }
            });
            for(i=0;i<imgs.length;i++)
            {
                anc = $el('<a class="bullet" href="javascript:void(0)" rel="'+i+'" title="'+(i+1)+'"></a>');
                $append(bullets, anc);
                $ev(anc, 'click', (function( index ){
                    return function( evt ) {
                    if ( paused ) return;
                    self.doTransition(String(index));
                };})(i));
            }
        }

        ind = linearArray(imgs.length);
        // randomize order
        if ( self.options.randomOrder ) shuffle(ind);

        prevcurrent = 0; current = 0;
        thisimg.style.backgroundImage = 'url("'+imgs[ind[current]]+'")';
        if ( self.options.controls )
        {
            toggleActive();
        }
        if ( self.options.caption && captions[ind[current]]!=null && captions[ind[current]]!="" )
        {
            $html(caption, captions[ind[current]]);
            $addClass(caption, 'show');
        }
        prepareTransition();
        return self;
    };

    getRandomTransition = function( ) {
        if ( randindex >= randtrans.length )
        {
            randtrans = shuffle(randtrans);
            randindex = 0;
        }
        return randtrans[randindex++];
    };

    toggleActive = function( ) {
        $$(".bullet", controls).forEach(function(a){$removeClass(a, "active");});
        $addClass($$('[rel="'+current+'"]', controls)[0], "active");
    };

    clearPrev = function( ) {
        if ( evtCarrier )
        {
            $ev(lastfx.transition==="fade-zoom"||lastfx.transition==="shuffle-left"||lastfx.transition==="shuffle-right" ? evtCarrier.firstChild : evtCarrier, 'animationend', endHandler, false);
            $empty(nextimg);
            $removeClass(nextimg, 'imagik-fx-'+lastfx.transition);
        }
        if ( p2!=null ) p2 = destroy(p2);
        if ( p!=null ) p = destroy(p);
        lastfx = null;
        evtCarrier = null;
    };

    endHandler = function( ) {
        setTimeout(endTransition, 10);
    };

    prepareTransition = function( ) {
        if ( imgs && imgs.length>0 && dotimer )
            timer = setTimeout(function(){self.doTransition("+1");}, 1000*fx[ind[current]].delay);
    };

    endTransition = function( ) {
        if ( !imgs ) return;
        clearPrev();
        thisimg.style.backgroundImage = 'url("'+imgs[ind[current]]+'")';
        thisimg.style.zIndex = 2;
        if ( self.options.caption && captions[ind[current]]!=null && captions[ind[current]]!="" )
            $addClass($html(caption, captions[ind[current]]), 'show');
        prepareTransition();
    };

    self.doTransition = function( dir ) {
        var i, dd, fxi, order, ease, r, c, temp, ordobj, ngroups, d, sd, del, max = 0, odd, animations = {};

        clearTimeout(timer);
        clearPrev();
        if ( !self.el || !imgs || !imgs.length ) return self;

        prevcurrent = current;

        if ( dir==="+1" ) current = (current+1)%imgs.length;
        else if ( dir==="-1" )  current = (current+imgs.length-1)%imgs.length;
        else  current = parseInt(dir, 10);

        if ( self.options.caption ) $removeClass(caption, 'show');
        if ( self.options.controls ) toggleActive();

        $style(self.style, style='');
        fxi = fx[ind[current]]; if ( "random"===fxi.transition ) fxi = getRandomTransition();
        order = fxi.order || 'rows-first'; if ( !HAS.call(Imagik.Static.order, order) ) order = 'rows-first';
        ease = fxi.ease || 'linear'; if ( HAS.call(Imagik.Static.ease, ease) ) ease = Imagik.Static.ease[ease];
        r = null!=Imagik.Static.transitions[fxi.transition].rows ? Imagik.Static.transitions[fxi.transition].rows : fxi.rows;
        c = null!=Imagik.Static.transitions[fxi.transition].columns ? Imagik.Static.transitions[fxi.transition].columns : fxi.columns;
        lastfx = fxi;

        if ( Imagik.Static.transitions[fxi.transition].reverse )
        {
            p = tiles(imgs[ind[prevcurrent]], r, c, W, H);
            thisimg.style.backgroundImage = 'url("'+imgs[ind[current]]+'")';
        }
        else
        {
            p = tiles(imgs[ind[current]], r, c, W, H);
        }

        numpiec = p.length;
        if ( fxi.transition==="flip-horizontal" || fxi.transition==="flip-vertical" || fxi.transition==="fade-zoom" ||
            fxi.transition==="shuffle-left" || fxi.transition==="shuffle-right" ||
            fxi.transition==="fold-left" || fxi.transition==="fold-right" )
        {
            thisimg.style.backgroundImage = 'none';
            p2 = tiles(imgs[ind[prevcurrent]], r, c, W, H);
            for(i=0;i<numpiec;i++)
            {
                dd = $el('<div class="imagik-tile-wrapper"></div>');
                p[i].piece.id = 'imagik-'+self.id+'-next-'+p[i].i+'-'+p[i].j;
                p2[i].piece.id = 'imagik-'+self.id+'-current-'+p2[i].i+'-'+p2[i].j;
                $append(dd, $addClass($addClass(p2[i].piece, 'imagik-tile-current'), 'imagik-tile-'+p2[i].i+'-'+p2[i].j));
                $append(dd, $addClass($addClass(p[i].piece, 'imagik-tile-next'), 'imagik-tile-'+p[i].i+'-'+p[i].j));
                if ( fxi.transition==="flip-vertical" )
                {
                    p2[i].piece.style.transform = 'rotateX(0deg)';
                    p[i].piece.style.transform = 'rotateX(180deg)';
                }
                else if ( fxi.transition==="flip-horizontal" )
                {
                    p2[i].piece.style.transform = 'rotateY(0deg)';
                    p[i].piece.style.transform = 'rotateY(-180deg)';
                }
                else if ( fxi.transition==="fold-left" )
                {
                    p2[i].piece.style.transformOrigin = '0 center';
                    p[i].piece.style.transformOrigin = '100% center';
                    p2[i].piece.style.transform = 'rotateY(0deg) translate3d(0,0,-'+W+'px)';
                    p[i].piece.style.transform = 'rotateY(-90deg) translate3d(0,0,0)';
                }
                else if ( fxi.transition==="fold-right" )
                {
                    p2[i].piece.style.transformOrigin = '0 center';
                    p[i].piece.style.transformOrigin = '0 center';
                    p2[i].piece.style.transform = 'rotateY(0deg) translate3d(0,0,-'+W+'px)';
                    p[i].piece.style.transform = 'rotateY(90deg) translate3d(0,0,0)';
                }
                p2[i].piece = dd;
                p[i].piece = dd;
            }
        }
        else if ( Imagik.Static.transitions[fxi.transition].current && Imagik.Static.transitions[fxi.transition].next )
        {
            thisimg.style.backgroundImage = 'none';
            p2 = tiles(imgs[ind[prevcurrent]], r, c, W, H);
            for(i=0;i<numpiec;i++)
            {
                dd = $el('<div class="imagik-tile-wrapper"></div>');
                p[i].piece.id = 'imagik-'+self.id+'-next-'+p[i].i+'-'+p[i].j;
                p2[i].piece.id = 'imagik-'+self.id+'-current-'+p2[i].i+'-'+p2[i].j;
                $append(dd, $addClass($addClass(p2[i].piece, 'imagik-tile-current'), 'imagik-tile-'+p2[i].i+'-'+p2[i].j));
                $append(dd, $addClass($addClass(p[i].piece, 'imagik-tile-next'), 'imagik-tile-'+p[i].i+'-'+p[i].j));

                style += "\n" + '#'+p2[i].piece.id+'{left:'+p2[i].x+'%;top:'+p2[i].y+'%;width:'+p2[i].w+'%;height:'+p2[i].h+'%;}';
                style += "\n" + '#'+p[i].piece.id+'{left:'+p[i].x+'%;top:'+p[i].y+'%;width:'+p[i].w+'%;height:'+p[i].h+'%;}';

                if ( is_obj(Imagik.Static.transitions[fxi.transition].current) )
                    style += "\n" + '#'+p2[i].piece.id+'{'+$css(translate(extend({}, Imagik.Static.transitions[fxi.transition].current), p2[i]))+'}';
                if ( is_obj(Imagik.Static.transitions[fxi.transition].next) )
                    style += "\n" + '#'+p[i].piece.id+'{'+$css(translate(extend({}, Imagik.Static.transitions[fxi.transition].next), p[i]))+'}';

                p[i].piece = dd;
                p2[i].piece = dd;

                if ( 'pan-' === fxi.transition.slice(0,4) ) { dd.style.width = '200%'; dd.style.height = '200%'; }
            }
        }
        ordobj = Imagik.Static.order[order](p,r,c);
        p = ordobj.pieces;
        thisimg.style.zIndex = 0;
        ngroups = ordobj.groups;
        d = fxi.duration/(ngroups-(ngroups-1)*fxi.overlap);
        sd = d-d*fxi.overlap;
        max = 0;
        odd = false;

        temp = extend({}, Imagik.Static.transitions[fxi.transition]);
        if ( is_array(temp.steps) && 2<=temp.steps.length )
        {
            animations['animation-'+self.id] = '@keyframes imagik-animation-'+self.id+'{'+temp.steps.map(function(step, n){
                return String(100*n/(temp.steps.length-1))+'%{'+$css(translate(step, p[0]))+'}';
            }).join("\n")+'}';
        }
        else if ( temp.end && (temp.start || (temp.start1 && temp.start2)) )
        {
            if ( temp.start1 && temp.start2 )
            {
                temp.start = temp.start2;
                temp._start = translate(temp.start, p[0]);
                temp._end = translate(temp.end, p[0]);
                animations['animation-'+self.id+'-even'] = '@keyframes imagik-animation-'+self.id+'-even{from{'+$css(temp._start)+'}to{'+$css(temp._end)+'}}';

                if ( 1<p.length )
                {
                    temp.start = temp.start1;
                    temp._start = translate(temp.start, p[1]);
                    temp._end = translate(temp.end, p[1]);
                    animations['animation-'+self.id+'-odd'] = '@keyframes imagik-animation-'+self.id+'-odd{from{'+$css(temp._start)+'}to{'+$css(temp._end)+'}}';
                }
            }
            else
            {
                temp._start = translate(temp.start, p[0]);
                temp._end = translate(temp.end, p[0]);
                animations['animation-'+self.id] = '@keyframes imagik-animation-'+self.id+'{from{'+$css(temp._start)+'}to{'+$css(temp._end)+'}}';
            }
        }

        for(i=0;i<numpiec;i++)
        {
            del = ordobj.delays[i]*sd;
            if ( !evtCarrier || max<=del )
            {
                evtCarrier = p[i].piece;
                max = del;
            }
            p[i].piece.id = 'imagik-'+self.id+'-'+p[i].i+'-'+p[i].j;
            style += "\n" + '#'+p[i].piece.id+'{left:'+p[i].x+'%;top:'+p[i].y+'%;width:'+p[i].w+'%;height:'+p[i].h+'%;}';
            $append(nextimg, p[i].piece);
            temp = Imagik.Static.transitions[fxi.transition];
            if ( temp.animation || (temp.animation1 && temp.animation2) )
            {
                if ( fxi.transition==="fade-zoom" )
                {
                    style += "\n" + '#'+p[i].piece.childNodes[0].id+'{animation:imagik-animation-'+temp.animation+' '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                    style += "\n" + '#'+p[i].piece.childNodes[1].id+'{animation:imagik-animation-'+temp.animation+' '+d+'s '+ease+' '+del+'s 1 reverse both running;}';
                }
                else if ( fxi.transition==="shuffle-left" )
                {
                    style += "\n" + '#'+p[i].piece.childNodes[0].id+'{animation:imagik-animation-shuffle-left_1 '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                    style += "\n" + '#'+p[i].piece.childNodes[1].id+'{animation:imagik-animation-shuffle-left_2 '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                }
                else if ( fxi.transition==="shuffle-right" )
                {
                    style += "\n" + '#'+p[i].piece.childNodes[0].id+'{animation:imagik-animation-shuffle-right_1 '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                    style += "\n" + '#'+p[i].piece.childNodes[1].id+'{animation:imagik-animation-shuffle-right_2 '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                }
                else
                {
                    if ( temp.animation1 && temp.animation2 )
                    {
                        if ( odd )
                        {
                            style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+temp.animation1+' '+d+'s '+ease+' '+del+'s 1 '+(temp.reverse?'reverse both':'normal both')+' running;}';
                        }
                        else
                        {
                            style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+temp.animation2+' '+d+'s '+ease+' '+del+'s 1 '+(temp.reverse?'reverse both':'normal both')+' running;}';
                        }
                    }
                    else
                    {
                        style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+temp.animation+' '+d+'s '+ease+' '+del+'s 1 '+(temp.reverse?'reverse both':'normal both')+' running;}';
                    }
                }
            }
            else if ( is_array(temp.steps) && 2<=temp.steps.length )
            {
                style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+self.id+' '+d+'s '+ease+' '+del+'s 1 normal both running;}';
            }
            else if ( temp.end && (temp.start || (temp.start1 && temp.start2)) )
            {
                if ( temp.start1 && temp.start2 )
                {
                    if ( odd )
                    {
                        style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+self.id+'-odd '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                    }
                    else
                    {
                        style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+self.id+'-even '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                    }
                }
                else
                {
                    style += "\n" + '#'+p[i].piece.id+'{animation:imagik-animation-'+self.id+' '+d+'s '+ease+' '+del+'s 1 normal both running;}';
                }
            }
            odd = !odd;
        }
        $addClass(nextimg, 'imagik-fx-'+lastfx.transition);
        for(i in animations)
        {
            if ( HAS.call(animations, i) )
                style = "\n" + animations[i] + style;
        }
        $style(self.style, style);
        $ev(lastfx.transition==="fade-zoom"||lastfx.transition==="shuffle-left"||lastfx.transition==="shuffle-right" ? evtCarrier.firstChild : evtCarrier, 'animationend', endHandler);
        //setTimeout(function( ){endTransition();}, 1000*fxi.duration+20);

        return self;
    };

    self.stopPlay = function( ) {
        dotimer = false;
        clearTimeout(timer);
        return self;
    };

    self.resumePlay = function( ) {
        dotimer = true;
        return self.doTransition("+1");
    };

    self.nextTransition = function( ) {
        return self.doTransition("+1");
    };

    self.prevTransition = function( ) {
        return self.doTransition("-1");
    };

    self.dispose = function( ) {
        hook(self.id, false);
        if ( p2!=null ) p2 = destroy(p2);
        if ( p!=null ) p = destroy(p);
        $remove(holder);
        $empty(nextimg);
        $empty(holder);
        holder = null;
        thisimg = null;
        nextimg = null;
        imgs = null;
        $remove(self.style);
        self.style = null;
        self.options = null;
        self.el = null;
        return self;
    };

    // go
    self.init();
}
Imagik.VERSION = "1.0.0";
Imagik.Static = {

    transitions: {
        "fold-left":{
            rows:1,
            columns:1,
            steps: [
                {
                    //"transform-origin":"0 center",
                    transform:"rotateY(0deg) translate3d(0,0,X(W)px)"
                }
                ,{
                    transform:"rotateY(4.5deg) translate3d(0,0,$(0.715*X(W))px)"
                }
                ,{
                    transform:"rotateY(9deg) translate3d(0,0,$(0.46*X(W))px)"
                }
                ,{
                    transform:"rotateY(13.5deg) translate3d(0,0,$(0.235*X(W))px)"
                }
                ,{
                    transform:"rotateY(18deg) translate3d(0,0,$(0.04*X(W))px)"
                }
                ,{
                    transform:"rotateY(22.5deg) translate3d(0,0,$(-0.125*X(W))px)"
                }
                ,{
                    transform:"rotateY(27deg) translate3d(0,0,$(-0.26*X(W))px)"
                }
                ,{
                    transform:"rotateY(31.5deg) translate3d(0,0,$(-0.365*X(W))px)"
                }
                ,{
                    transform:"rotateY(36deg) translate3d(0,0,$(-0.44*X(W))px)"
                }
                ,{
                    transform:"rotateY(40.5deg) translate3d(0,0,$(-0.485*X(W))px)"
                }
                ,{
                    transform:"rotateY(45deg) translate3d(0,0,$(-0.5*X(W))px)"
                }
                ,{
                    transform:"rotateY(49.5deg) translate3d(0,0,$(-0.485*X(W))px)"
                }
                ,{
                    transform:"rotateY(54deg) translate3d(0,0,$(-0.44*X(W))px)"
                }
                ,{
                    transform:"rotateY(58.5deg) translate3d(0,0,$(-0.365*X(W))px)"
                }
                ,{
                    transform:"rotateY(63deg) translate3d(0,0,$(-0.26*X(W))px)"
                }
                ,{
                    transform:"rotateY(67.5deg) translate3d(0,0,$(-0.125*X(W))px)"
                }
                ,{
                    transform:"rotateY(72deg) translate3d(0,0,$(0.04*X(W))px)"
                }
                ,{
                    transform:"rotateY(76.5deg) translate3d(0,0,$(0.235*X(W))px)"
                }
                ,{
                    transform:"rotateY(81deg) translate3d(0,0,$(0.46*X(W))px)"
                }
                ,{
                    transform:"rotateY(85.5deg) translate3d(0,0,$(0.715*X(W))px)"
                }
                ,{
                    transform:"rotateY(90deg) translate3d(0,0,X(W)px)"
                }
            ]
        }
        ,"fold-right":{
            rows:1,
            columns:1,
            steps: [
                {
                    //"transform-origin":"100% center",
                    transform:"rotateY(0deg) translate3d(0,0,X(W)px)"
                }
                ,{
                    transform:"rotateY(-4.5deg) translate3d(0,0,$(0.715*X(W))px)"
                }
                ,{
                    transform:"rotateY(-9deg) translate3d(0,0,$(0.46*X(W))px)"
                }
                ,{
                    transform:"rotateY(-13.5deg) translate3d(0,0,$(0.235*X(W))px)"
                }
                ,{
                    transform:"rotateY(-18deg) translate3d(0,0,$(0.04*X(W))px)"
                }
                ,{
                    transform:"rotateY(-22.5deg) translate3d(0,0,$(-0.125*X(W))px)"
                }
                ,{
                    transform:"rotateY(-27deg) translate3d(0,0,$(-0.26*X(W))px)"
                }
                ,{
                    transform:"rotateY(-31.5deg) translate3d(0,0,$(-0.365*X(W))px)"
                }
                ,{
                    transform:"rotateY(-36deg) translate3d(0,0,$(-0.44*X(W))px)"
                }
                ,{
                    transform:"rotateY(-40.5deg) translate3d(0,0,$(-0.485*X(W))px)"
                }
                ,{
                    transform:"rotateY(-45deg) translate3d(0,0,$(-0.5*X(W))px)"
                }
                ,{
                    transform:"rotateY(-49.5deg) translate3d(0,0,$(-0.485*X(W))px)"
                }
                ,{
                    transform:"rotateY(-54deg) translate3d(0,0,$(-0.44*X(W))px)"
                }
                ,{
                    transform:"rotateY(-58.5deg) translate3d(0,0,$(-0.365*X(W))px)"
                }
                ,{
                    transform:"rotateY(-63deg) translate3d(0,0,$(-0.26*X(W))px)"
                }
                ,{
                    transform:"rotateY(-67.5deg) translate3d(0,0,$(-0.125*X(W))px)"
                }
                ,{
                    transform:"rotateY(-72deg) translate3d(0,0,$(0.04*X(W))px)"
                }
                ,{
                    transform:"rotateY(-76.5deg) translate3d(0,0,$(0.235*X(W))px)"
                }
                ,{
                    transform:"rotateY(-81deg) translate3d(0,0,$(0.46*X(W))px)"
                }
                ,{
                    transform:"rotateY(-85.5deg) translate3d(0,0,$(0.715*X(W))px)"
                }
                ,{
                    transform:"rotateY(-90deg) translate3d(0,0,X(W)px)"
                }
            ]
        }
        ,"shuffle-left":{
            rows:1,
            columns:1,
            animation: "shuffle-left"
        }
        ,"shuffle-right":{
            rows:1,
            columns:1,
            animation: "shuffle-right"
        }
        ,"rotate":{
            animation: "rotate"
        }
        ,"rotate-reverse":{
            reverse:true,
            animation: "rotate"
        }
        ,"flip-horizontal":{
            animation: "flip-horizontal"
        }
        ,"flip-vertical":{
            animation: "flip-vertical"
        }
        ,"iris":{
            rows:1,
            columns:1,
            animation: "iris"
        }
        ,"iris-reverse":{
            reverse:true,
            rows:1,
            columns:1,
            animation: "iris"
        }
        ,"fade":{
            animation: "fade"
        }
        ,"fade-zoom":{
            rows:1,
            columns:1,
            animation: "fade-zoom"
        }
        ,"move-down":{
            animation:"move-down"
        }
        ,"move-up":{
            animation:"move-up"
        }
        ,"move-right":{
            animation:"move-right"
        }
        ,"move-left":{
            animation:"move-left"
        }
        ,"move-up-down":{
            animation1:"move-down",
            animation2:"move-up"
        }
        ,"move-left-right":{
            animation1:"move-right",
            animation2:"move-left"
        }
        ,"move-fade-down":{
            animation:"move-fade-down"
        }
        ,"move-fade-up":{
            animation:"move-fade-up"
        }
        ,"move-fade-up-down":{
            animation1:"move-fade-down",
            animation2:"move-fade-up"
        }
        ,"move-fade-right":{
            animation:"move-fade-right"
        }
        ,"move-fade-left":{
            animation:"move-fade-left"
        }
        ,"move-fade-left-right":{
            animation1:"move-fade-right",
            animation2:"move-fade-left"
        }
        ,"fade-grow":{
            start:{opacity:"0",width:"0%",height:"0%"},
            end:{opacity:"1",width:"X(w)%",height:"X(h)%"}
        }
        ,"fade-shrink":{
            reverse:true,
            start:{opacity:"1",width:"X(w)%",height:"X(h)%"},
            end:{opacity:"0",width:"0%",height:"0%"}
        }
        ,"shrink":{
            reverse:true,
            start:{width:"X(w)%",height:"X(h)%"},
            end:{width:"0%",height:"0%"}
        }
        ,"grow":{
            start:{width:"0%",height:"0%"},
            end:{width:"X(w)%",height:"X(h)%"}
        }
        ,"shrink-horizontal":{
            reverse:true,
            start:{width:"X(w)%"},
            end:{width:"0%"}
        }
        ,"grow-horizontal":{
            start:{width:"0%"},
            end:{width:"X(w)%"}
        }
        ,"grow-fade-vertical":{
            start:{height:"0%",opacity:"0"},
            end:{height:"X(h)%",opacity:"1"}
        }
        ,"grow-fade-horizontal":{
            start:{width:"0%",opacity:"0"},
            end:{width:"X(w)%",opacity:"1"}
        }
        ,"grow-vertical":{
            start:{height:"0%"},
            end:{height:"X(h)%"}
        }
        ,"shrink-vertical":{
            reverse:true,
            start:{height:"X(h)%"},
            end:{height:"0%"}
        }
        ,"fly-top-left":{
            rows:1,
            columns:1,
            animation:"fly-top-left"
        }
        ,"fly-bottom-left":{
            rows:1,
            columns:1,
            animation:"fly-bottom-left"
        }
        ,"fly-top-right":{
            rows:1,
            columns:1,
            animation:"fly-top-right"
        }
        ,"fly-bottom-right":{
            rows:1,
            columns:1,
            animation:"fly-bottom-right"
        }
        ,"fly-left":{
            rows:1,
            columns:1,
            animation:"fly-left"
        }
        ,"fly-right":{
            rows:1,
            columns:1,
            animation:"fly-right"
        }
        ,"fly-top":{
            rows:1,
            columns:1,
            animation:"fly-top"
        }
        ,"fly-bottom":{
            rows:1,
            columns:1,
            animation:"fly-bottom"
        }
        ,"pan-top-left":{
            rows:1,
            columns:1,
            animation:"pan-top-left",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"50%",top:"50%",width:"50%",height:"50%"}
        }
        ,"pan-top-right":{
            rows:1,
            columns:1,
            animation:"pan-top-right",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"-50%",top:"50%",width:"50%",height:"50%"}
        }
        ,"pan-bottom-right":{
            rows:1,
            columns:1,
            animation:"pan-bottom-right",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"-50%",top:"-50%",width:"50%",height:"50%"}
        }
        ,"pan-bottom-left":{
            rows:1,
            columns:1,
            animation:"pan-bottom-left",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"-50%",top:"50%",width:"50%",height:"50%"}
        }
        ,"pan-left":{
            rows:1,
            columns:1,
            animation:"pan-left",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"50%",top:"0%",width:"50%",height:"50%"}
        }
        ,"pan-right":{
            rows:1,
            columns:1,
            animation:"pan-right",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"-50%",top:"0%",width:"50%",height:"50%"}
        }
        ,"pan-top":{
            rows:1,
            columns:1,
            animation:"pan-top",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"0%",top:"50%",width:"50%",height:"50%"}
        }
        ,"pan-bottom":{
            rows:1,
            columns:1,
            animation:"pan-bottom",
            current:{left:"0%",top:"0%",width:"50%",height:"50%"},
            next:{left:"0%",top:"-50%",width:"50%",height:"50%"}
        }
    }

    ,order: {
        "checkerboard":checkerBoard
        ,"diagonal-top-left":diagonalTopLeft
        ,"diagonal-top-right":diagonalTopRight
        ,"diagonal-bottom-left":diagonalBottomLeft
        ,"diagonal-bottom-right":diagonalBottomRight
        ,"rows":rows
        ,"rows-reverse":rowsReverse
        ,"rows-first":rowsFirst
        ,"rows-first-reverse":rowsFirstReverse
        ,"columns":columns
        ,"columns-reverse":columnsReverse
        ,"columns-first":columnsFirst
        ,"columns-first-reverse":columnsFirstReverse
        ,"spiral-top-left":spiralTopLeft
        ,"spiral-top-right":spiralTopRight
        ,"spiral-bottom-left":spiralBottomLeft
        ,"spiral-bottom-right":spiralBottomRight
        ,"spiral-top-left-reverse":spiralTopLeftReverse
        ,"spiral-top-right-reverse":spiralTopRightReverse
        ,"spiral-bottom-left-reverse":spiralBottomLeftReverse
        ,"spiral-bottom-right-reverse":spiralBottomRightReverse
        ,"up-down":upDown
        ,"up-down-reverse":upDownReverse
        ,"left-right":leftRight
        ,"left-right-reverse":leftRightReverse
        ,"random":random
    }

    ,ease: {
        "linear":"linear"
        ,"ease":"ease"
        ,"ease-in":"ease-in"
        ,"ease-out":"ease-out"
        ,"ease-in-out":"ease-in-out"
        ,"ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)"
        ,"ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)"
        ,"ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)"
        ,"ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)"
        ,"ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)"
        ,"ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)"
        ,"ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)"
        ,"ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)"
        ,"ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        ,"ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)"
        ,"ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)"
        ,"ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)"
        ,"ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)"
        ,"ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)"
        ,"ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)"
        ,"ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)"
        ,"ease-in-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)"
        ,"ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)"
        ,"ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)"
        ,"ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)"
        ,"ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)"
        ,"ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)"
        ,"ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)"
        ,"ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"
    }

    ,randomTransitions: [
         {transition:"flip-horizontal",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"spiral-top-left"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-top-left"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-bottom-right"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"random"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"spiral-top-left"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-top-left"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-bottom-right"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:8,columns:8,order:"random"}
        ,{transition:"shuffle-left",ease:"ease-in-out",duration:1.5,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"shuffle-right",ease:"ease-in-out",duration:1.5,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fold-left",ease:"ease-in-out",duration:1.5,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fold-right",ease:"ease-in-out",duration:1.5,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"rotate",ease:"ease-out",duration:1.5,overlap:1,rows:8,columns:8,order:"columns-first"}
        ,{transition:"rotate-reverse",ease:"ease-out",duration:1.5,overlap:1,rows:8,columns:8,order:"columns-first"}
        ,{transition:"iris",ease:"ease-out",duration:1.5,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"iris-reverse",ease:"ease-out",duration:1.5,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fade-zoom",ease:"ease-out",duration:1.5,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-top-left"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-bottom-right"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"random"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"spiral-top-left"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"spiral-bottom-right"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"left-right"}
        ,{transition:"fade",ease:"ease-in",duration:1.5,overlap:0.9,rows:8,columns:8,order:"up-down"}
        ,{transition:"grow-horizontal",ease:"ease-out",duration:1.5,overlap:0.9,rows:1,columns:8,order:"random"}
        ,{transition:"grow-vertical",ease:"ease-out",duration:1.5,overlap:0.9,rows:8,columns:1,order:"random"}
        ,{transition:"grow-fade-horizontal",ease:"ease-out",duration:1.5,overlap:0.9,rows:1,columns:8,order:"random"}
        ,{transition:"grow-fade-vertical",ease:"ease-out",duration:1.5,overlap:0.9,rows:8,columns:1,order:"random"}
        ,{transition:"grow",ease:"ease-out",duration:1.5,overlap:0.9,rows:8,columns:8,order:"rows-first"}
        ,{transition:"shrink",ease:"ease-out",duration:1.5,overlap:1,rows:8,columns:8,order:"columns-first"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:1.5,overlap:0.9,rows:8,columns:8,order:"left-right"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:1.5,overlap:0.9,rows:8,columns:8,order:"diagonal-bottom-right"}
        ,{transition:"move-left-right",ease:"ease-out-back",duration:1.5,overlap:0.8,rows:8,columns:1,order:"columns-first"}
        ,{transition:"move-right",ease:"ease-out-back",duration:1.5,overlap:0.8,rows:8,columns:1,order:"columns-first"}
        ,{transition:"move-up-down",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:8,order:"columns-first"}
        ,{transition:"move-up",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:8,order:"columns-first"}
        ,{transition:"fly-top-left",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-bottom-right",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-left",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-right",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-top",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-bottom",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-top-left",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-bottom-right",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-left",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-right",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-top",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-bottom",ease:"ease-out-back",duration:1.5,overlap:0.9,rows:1,columns:1,order:"columns-first"}
    ]

    // utils
    ,extend: extend
    ,translate: translate
    ,linearArray: linearArray
    ,shuffle: shuffle
    ,tiles: tiles
};


return Imagik;
});