/**
*
*    Imagik Responsive CSS3 Slideshow
*    version 1.1.2
*    https://github.com/foo123/Imagik
*
**/
!function(root, factory){
"use strict";
if (typeof define === 'function' && define.amd) define(factory);
else root.Imagik = factory();
}('undefined' !== typeof self ? self : this, function Imagik__Factory( ){
"use strict";

var stdMath = Math, toRad = stdMath.PI/180, sqrt2 = stdMath.sqrt(2),
    prop_re = /(?:X\()(\w+)(?:\))/g,
    toString = Object.prototype.toString,
    HAS = Object.prototype.hasOwnProperty,
    slice = Array.prototype.slice;

function ID( )
{
    if ( null == ID.N ) ID.N = 0;
    return ++ID.N;
}
function is_webkit( )
{
    return 'webkitRequestAnimationFrame' in window;
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
function extend( o1, o2, ignore )
{
    ignore = is_array(ignore) ? ignore : [];
    for(var k in o2)
    {
        if ( !HAS.call(o2, k) || (-1!==ignore.indexOf(k)) ) continue;
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
    return slice.call((el||document).querySelectorAll(sel));
}
function $children( sel, el )
{
    var children, id, guid;
    if ( sel )
    {
        children = slice.call(el.children).filter(function(child){return child.matches ? child.matches(sel) : (child.msMatchesSelector ? child.msMatchesSelector(sel) : (child.webkitMatchesSelector ? child.webkitMatchesSelector(sel) : true));});
        /*if ( null == $children.count ) $children.count = 0;
        id = el.id;
        guid = el.id = id || ('query_children_' + (++$children.count));
        sel = '#' + guid + ' > ' + sel.replace(/,/g, ',#' + guid + ' > ');
        children = $$(sel, el);
        if ( !id ) el.removeAttribute('id');
        return children;*/
    }
    else
    {
        children = slice.call(el.children);
    }
    return children;
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
    while(el.firstChild) el.removeChild(el.firstChild);
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
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columnsi;i++)
    {
        for(j=0;j<rowsi;j++)
        {
            delays[k++/*i*rowsi+j*/] = j;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:rowsi};
}
function rowsReverse( pieces, rows, columns )
{
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = rows-1-j;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:rows};
}
function columns( pieces, rowsi, columnsi )
{
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columnsi;i++)
    {
        for(j=0;j<rowsi;j++)
        {
            delays[k++/*i*rowsi+j*/] = i;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:columnsi};
}
function columnsReverse( pieces, rows, columns )
{
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = columns-1-i;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:columns};
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
    var newpieces = new Array(pieces.length), i, j;
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
function spiral( pieces, rows, columns, type )
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
    var newpieces = new Array(pieces.length), odd = false, i, j;
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
    var newpieces = new Array(pieces.length), odd = false, i, j;
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
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = i+j;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function diagonalBottomRight( pieces, rows, columns )
{
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = columns-1-i+rows-1-j;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function diagonalBottomLeft( pieces, rows, columns )
{
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = i+rows-1-j;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function diagonalTopRight( pieces, rows, columns )
{
    var delays = new Array(pieces.length), i, j, k;
    for(k=0,i=0;i<columns;i++)
    {
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = columns-1-i+j;
            if ( k >= pieces.length ) break;
        }
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:rows+columns-1};
}
function checkerBoard( pieces, rows, columns )
{
    var delays = new Array(pieces.length), i, j, k, odd1 = false, odd2;
    for(k=0,i=0;i<columns;i++)
    {
        odd2 = odd1;
        for(j=0;j<rows;j++)
        {
            delays[k++/*i*rows+j*/] = odd2 ? 1 : 0;
            if ( k >= pieces.length ) break;
            odd2 = !odd2;
        }
        odd1 = !odd1;
        if ( k >= pieces.length ) break;
    }
    return {pieces:pieces, delays:delays, groups:2};
}
function tiles( img, rows, columns, W, H, angle )
{
    var i, j, ii, jj, x, y, bx, by, w, h, pieces, tile, ww, s, m1, m2, imax, clipPath, size, side, margin, margin2, offset;
    if ( true===angle )
    {
        size = stdMath.max(1.0/columns, 1.0/rows);
        columns = 2*stdMath.ceil(1/size)+2; rows = stdMath.ceil(1/(size*(W/H)))+1;
        w = stdMath.max(2*W/(columns-2), H/(rows-1)); side = w/sqrt2;
        margin = w/2; margin2 = margin/2; offset = -margin;
        pieces = [];
        for(ii=0,i=0;i<columns; i++)
        {
            for(jj=0,j=0; j<rows; j++)
            {
                x = margin*i-margin; y = w*j-margin+offset;
                bx = -x+margin2; by = -y+margin2;
                if ( stdMath.abs(bx)<W && bx+side+margin<=W && stdMath.abs(by)<H && by+side+margin<=H )
                {
                    pieces.push({piece:tile=$el('<div class="imagik-tile imagik-diagonal"><div class="imagik-tile-inside" style="width:'+String(side+margin)+'px;height:'+String(side+margin)+'px;left:'+String(-margin2)+'px;top:'+String(-margin2)+'px;"></div></div>'), r:rows, c:columns, i:ii, j:jj++, x:x, y:y, bx:bx, by:by, w:side, h:side, u:'px', W:W, H:H, img:img, vis:true});
                    tile.firstChild.style.backgroundImage = 'url("'+String(img)+'")';
                    tile.firstChild.style.backgroundPosition = String(bx)+'px '+String(by)+'px';
                    tile.firstChild.style.backgroundSize = String(W)+'px auto';
                }
            }
            if ( 0 < jj ) ii++;
            offset = 0===offset ? -margin : 0;
        }
    }
    else if ( null != angle )
    {
        angle = angle || 0;
        if ( angle<0 ) angle = -angle;
        if( angle>90 ) angle = angle % 90;
        if ( 0===angle ) { s = rows; rows = columns; columns = s; }
        if ( 90===angle )
        {
            m1 = 1.0;
            m2 = 0.0;
            imax = 0;
        }
        else if ( 0===angle )
        {
            m1 = 0.0;
            m2 = 1.0;
            imax = 0;
        }
        else
        {
            m1 = 1.0;
            m2 = 1.0/stdMath.tan(angle*toRad);
            imax = 1;
        }
        w = 1===(columns-imax) ? W : (W/(columns-imax));
        h = 1===rows ? H : (H/rows);
        pieces = new Array(rows*columns)
        s = m2*H/(columns-imax);
        ww = 0===angle ? w : (m1*w + s);
        for(i=0;i<columns; i++)
        {
            for(j=0; j<rows; j++)
            {
                x = w*(i-imax); y = h*j;
                bx = -x; by = -y;
                if ( 0===angle )
                {
                    clipPath = [[0, 0], [w, 0], [w, h], [0, h]];
                }
                else
                {
                    clipPath = [[0, 0], [s, h], [w+s, h], [w, 0]];
                }
                clipPath = 'border-box polygon('+clipPath.map(function(pt){return String(pt[0])+'px '+String(pt[1])+'px';}).join(',')+')';
                //clipPath = 'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3CclipPath id=\\"clipPath-'+i+'-'+j+'\\" clipPathUnits=\\"objectBoundingBox\\"%3E%3Cpolygon points=\\"'+clipPath.map(function(pt){return String(pt[0])+','+String(pt[1])+'';}).join(' ')+'\\" /%3E%3C/clipPath%3E%3C/svg%3E%0A#clipPath-'+i+'-'+j+'")';
                pieces[i*rows+j] = {piece:tile=$el('<div class="imagik-tile" style="-webkit-clip-path:'+clipPath+';clip-path:'+clipPath+';"><div class="imagik-tile-inside"></div></div>'), r:rows, c:columns, i:i, j:j, x:x, y:y, bx:bx, by:by, w:ww, h:h, u:'px', W:W, H:H, slope:s, angle:angle, img:img, vis:true};
                tile.firstChild.style.backgroundImage = 'url("'+String(img)+'")';
                tile.firstChild.style.backgroundPosition = String(bx)+'px '+String(by)+'px';
                tile.firstChild.style.backgroundSize = String(W)+'px auto';
            }
        }
    }
    else
    {
        w = 1===columns ? 100 : (W/columns*101/W);
        h = 1===rows ? 100 : (H/rows*101/H);
        pieces = new Array(rows*columns);
        for(i=0;i<columns; i++)
        {
            for(j=0; j<rows; j++)
            {
                x = w/columns*i*100/w; y = h/rows*j*100/h;
                bx = -W/columns*i; by = -H/rows*j;
                pieces[i*rows+j] = {piece:tile=$el('<div class="imagik-tile"><div class="imagik-tile-inside"></div></div>'), r:rows, c:columns, i:i, j:j, x:x, y:y, bx:bx, by:by, w:w, h:h, u:'%', W:W, H:H, img:img, vis:true};
                tile.firstChild.style.backgroundImage = 'url("'+String(img)+'")';
                tile.firstChild.style.backgroundPosition = String(bx)+'px '+String(by)+'px';
                tile.firstChild.style.backgroundSize = String(W)+'px auto';
            }
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
    var i, j, k, p, c, e, evaluator, r, done;
    if ( is_string(where) )
    {
        where = where.replace(prop_re, function(m0, m1){
            return HAS.call(what, m1) ? String(what[m1]) : m0;
        });
        j = 0;
        while( -1!==(i=where.indexOf('$(', j)) )
        {
            p = 1; k = 2; e = ''; done = false;
            while( i+k<where.length )
            {
                c = where.charAt(i+k);
                if ( ')' === c )
                {
                    p--;
                    if ( 0===p )
                    {
                        done = true;
                        break;
                    }
                }
                else if ( '(' === c )
                {
                    p++;
                }
                e += c;
                k++;
            }
            if ( done )
            {
                try {
                    evaluator = new Function('', 'return String('+e+');');
                } catch(err) {
                    console.warn('Imagik: Error in expression "$('+e+')", '+err.toString());
                    evaluator = function(){return '0';};
                }
                r = evaluator();
                where = where.slice(0,i)+r+where.slice(i+k+1);
                k = r.length
            }
            j = i+k+1;
        }
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
        imgs: null,
        onStart: null, // on Transition Start event handler
        onComplete: null // on Transition Complete event handler
    };

    options = extend(defaults, options||{});
    if ( !options.aspectRatio ) options.aspectRatio = 1.0;
    options.rows = stdMath.max(1, stdMath.min(100, options.rows));
    options.columns = stdMath.max(1, stdMath.min(100, options.columns));
    options.overlap = stdMath.max(0.0, stdMath.min(1.0, options.overlap));
    options.duration = stdMath.max(0.0, options.duration);
    options.delay = stdMath.max(0.0, options.delay);

    self.id = ID();
    self.el = el;
    if ( !self.el.id ) self.el.id = 'imagik-instance-'+self.id;
    self.options = options;
    self.style = $el('<style id="imagik-css-'+self.id+'" type="text/css" media="all"></style>');
    $append(self.style, document.createTextNode(''));
    $append(document.head, self.style);

    // global vars
    var holder, caption, controls, imageLayer, animationLayer, imgs = [], links = [], fx = [], captions = [], ind = [],
        current = -1, prevcurrent = -1, timer, dotimer = true, paused = false, p = null, p2 = null,
        numpiec = 0, style = '', lastfx = null, evtCarrier = null, W, H,
        randtrans = shuffle(Imagik.Static.randomTransitions.slice()), randindex = 0,
        getRandomTransition, toggleActive, prepareTransition, clearPrev, endHandler, endTransition
    ;

    self.autoResize = function( ) {
        if ( self.el && holder )
        {
            W = stdMath.round(self.el.clientWidth); H = stdMath.round(W/self.options.aspectRatio);
            holder.style.width = String(W)+'px';
            holder.style.height = String(H)+'px';
            imageLayer.style.backgroundSize = String(W)+'px auto';
        }
        return self;
    };

    self.init = function( ) {
        if ( !self.el || $$('.imagik-holder', self.el).length ) return self;

        holder = $el('<div class="imagik-holder"></div>');
        if ( is_webkit() ) $addClass(holder, 'imagik-webkit');

        // parse dom data
        $children('div', self.el).forEach(function( div ) {
            var klass, thisfx = {}, i, link, data, kv;
            thisfx.transition = self.options.transition;
            thisfx.delay = self.options.delay;
            thisfx.ease = self.options.ease;
            thisfx.order = self.options.order;
            thisfx.rows = self.options.rows;
            thisfx.columns = self.options.columns;
            thisfx.overlap = self.options.overlap;
            thisfx.duration = self.options.duration;
            klass = $attr(div, 'class');
            if ( klass!="" && klass!=null )
            {
                data = klass.split(" ");
                for(i=0;i<data.length;i++)
                {
                    kv = data[i].trim().split("=");
                    if ( 2 <= kv.length ) thisfx[kv[0].trim()] = kv[1].trim();
                }
                thisfx.rows = stdMath.max(1, stdMath.min(100, parseInt(thisfx.rows, 10)));
                thisfx.columns = stdMath.max(1, stdMath.min(100, parseInt(thisfx.columns, 10)));
                thisfx.overlap = stdMath.max(0.0, stdMath.min(1.0, parseFloat(thisfx.overlap, 10)));
                thisfx.duration = stdMath.max(0.0, parseFloat(thisfx.duration, 10));
                thisfx.delay = stdMath.max(0.0, parseFloat(thisfx.delay, 10));
            }
            link = $children('a', div)[0];
            imgs.push($children('img', link||div)[0]);
            links.push($attr(link, 'href')||'#');
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

                thisfx.rows = stdMath.max(1, stdMath.min(100, parseInt(thisfx.rows, 10)));
                thisfx.columns = stdMath.max(1, stdMath.min(100, parseInt(thisfx.columns, 10)));
                thisfx.overlap = stdMath.max(0.0, stdMath.min(1.0, parseFloat(thisfx.overlap, 10)));
                thisfx.duration = stdMath.max(0.0, parseFloat(thisfx.duration, 10));
                thisfx.delay = stdMath.max(0.0, parseFloat(thisfx.delay, 10));

                imgs.push(img);
                links.push(img.href||'#');
                fx.push(thisfx);
                captions.push(img.caption!=null ? String(img.caption).trim() : '');
            });
        }

        $append(self.el, holder);

        imageLayer = $el('<a href="#" class="imagik-image-layer"></a>');
        imageLayer.style.zIndex = 2;
        animationLayer = $el('<div class="imagik-animation-layer"></div>');
        animationLayer.style.zIndex = 1;
        $append(holder, imageLayer);
        $append(holder, animationLayer);

        var i, anc, prevBt, nextBt, playBt, bullets, buttons;

        if ( self.options.caption )
        {
            caption = $el('<div class="imagik-caption"></div>');
            $append(holder, caption);
        }
        if ( self.options.controls )
        {
            //controls = $el('<div class="imagik-controls"></div>');
            //$append(controls, bullets=$el('<div class="bullets"></div>'));
            //$append(controls, buttons=$el('<div class="controls"></div>'));
            //$append(holder, controls);

            prevBt = $el('<a class="imagik-prev" href="javascript:void(0)" title="Previous"></a>');
            nextBt = $el('<a class="imagik-next" href="javascript:void(0)" title="Next"></a>');
            playBt = $el('<a class="imagik-play-pause" href="javascript:void(0)" title="Play/Pause"></a>');
            $append(holder, prevBt);
            $append(holder, nextBt);
            $append(holder, playBt);
            $ev(prevBt, 'click', function( evt ) {
                evt.stopPropagation();
                if ( paused ) return;
                self.prevTransition();
            });
            $ev(nextBt, 'click', function( evt ) {
                evt.stopPropagation();
                if ( paused ) return;
                self.nextTransition();
            });
            $ev(holder, 'click', function( evt ) {
                paused = !paused;
                if ( paused )
                {
                    self.stopPlay();
                    $addClass(holder, 'paused');
                }
                else
                {
                    self.resumePlay();
                    $removeClass(holder, 'paused');
                }
            });
            /*for(i=0;i<imgs.length;i++)
            {
                anc = $el('<a class="bullet" href="javascript:void(0)" rel="'+i+'" title="'+(i+1)+'"></a>');
                $append(bullets, anc);
                $ev(anc, 'click', (function( index ){
                    return function( evt ) {
                        if ( paused ) return;
                        self.doTransition(String(index));
                };})(i));
            }*/
        }

        ind = linearArray(imgs.length);
        // randomize order
        if ( self.options.randomOrder ) shuffle(ind);

        prevcurrent = 0; current = 0;
        imageLayer.style.backgroundImage = 'url("'+(imgs[ind[current]].currentSrc||imgs[ind[current]].src)+'")'; // enable responsive images (eg through srcset attr)
        imageLayer.href = links[ind[current]];
        $addClass(holder, 'imagik-show-image');
        /*if ( self.options.controls )
        {
            toggleActive();
        }*/
        if ( self.options.caption && captions[ind[current]]!=null && captions[ind[current]]!="" )
        {
            $html(caption, captions[ind[current]]);
            $addClass(caption, 'show');
        }

        // resize handler
        hook(self.id, function(evt){self.autoResize();});
        self.autoResize();

        prepareTransition();
        return self;
    };

    getRandomTransition = function( ) {
        if ( randindex >= randtrans.length )
        {
            randtrans = shuffle(Imagik.Static.randomTransitions.slice());
            randindex = 0;
        }
        return randindex<randtrans.length ? randtrans[randindex++] : null;
    };

    /*toggleActive = function( ) {
        $$(".bullet", controls).forEach(function(a){$removeClass(a, "active");});
        $addClass($$('[rel="'+current+'"]', controls)[0], "active");
    };*/

    clearPrev = function( ) {
        //if ( lastfx && 'fade-rhombus'===lastfx.transition ) return;
        if ( evtCarrier )
        {
            $ev(evtCarrier, 'animationend', endHandler, false);
            $empty(animationLayer);
            $removeClass(animationLayer, 'imagik-fx-'+lastfx.transition);
            $removeClass(animationLayer, 'imagik-fx');
        }
        if ( p2!=null ) p2 = destroy(p2);
        if ( p!=null ) p = destroy(p);
        evtCarrier = null;
        $addClass(holder, 'imagik-show-image');
    };

    endHandler = function( ) {
        setTimeout(endTransition, 10);
    };

    prepareTransition = function( ) {
        if ( imgs && imgs.length>0 && dotimer )
            timer = setTimeout(function(){self.doTransition("+1");}, 1000*fx[ind[current]].delay);
    };

    endTransition = function( ) {
        clearPrev();
        if ( !imgs ) return;
        //if ( lastfx && 'fade-rhombus'===lastfx.transition ) return;
        imageLayer.style.backgroundImage = 'url("'+(imgs[ind[current]].currentSrc||imgs[ind[current]].src)+'")'; // enable responsive images (eg through srcset attr)
        imageLayer.href = links[ind[current]];
        imageLayer.style.zIndex = 2;
        if ( self.options.caption && captions[ind[current]]!=null && captions[ind[current]]!="" )
            $addClass($html(caption, captions[ind[current]]), 'show');
        prepareTransition();

        // signal completion if handler given
        if ( "function"===typeof self.options.onComplete ) self.options.onComplete(self);
    };

    self.doTransition = function( dir ) {
        var i, dd, fxi, transition, order, ease, r, c, overlap, ordobj, ngroups, d, sd, del, max, odd, animations = {}, str, selector, angle = null;

        clearTimeout(timer);
        clearPrev();
        if ( !self.el || !imgs || !imgs.length ) return self;

        prevcurrent = current;

        if ( dir==="+1" ) current = (current+1)%imgs.length;
        else if ( dir==="-1" )  current = (current+imgs.length-1)%imgs.length;
        else  current = parseInt(dir, 10);

        if ( self.options.caption ) $removeClass(caption, 'show');
        //if ( self.options.controls ) toggleActive();
        // signal completion if handler given

        // signal start if handler given
        if ( "function"===typeof self.options.onStart ) self.options.onStart(self);

        $style(self.style, style='');
        fxi = fx[ind[current]]; if ( "random"===fxi.transition ) fxi = getRandomTransition();
        if ( !fxi || !fxi.transition || !HAS.call(Imagik.Static.transitions, fxi.transition) )
        {
            imageLayer.style.backgroundImage = 'url("'+(imgs[ind[current]].currentSrc||imgs[ind[current]].src)+'")';
            return self;
        }
        transition = extend({}, Imagik.Static.transitions[fxi.transition]);
        order = fxi.order || 'rows-first'; if ( !HAS.call(Imagik.Static.order, order) ) order = 'rows-first';
        ease = fxi.ease || 'linear'; if ( HAS.call(Imagik.Static.ease, ease) ) ease = Imagik.Static.ease[ease];
        r = null!=transition.rows ? transition.rows : fxi.rows;
        c = null!=transition.columns ? transition.columns : fxi.columns;
        overlap = null!=transition.overlap ? transition.overlap : fxi.overlap;
        angle = null!=transition.angle ? transition.angle : null;
        selector = is_string(transition.selector)&&transition.selector.length ? transition.selector : '';
        lastfx = fxi;

        if ( transition.reverse )
        {
            p = tiles((imgs[ind[prevcurrent]].currentSrc||imgs[ind[prevcurrent]].src), r, c, W, H, angle);
            imageLayer.style.backgroundImage = 'url("'+(imgs[ind[current]].currentSrc||imgs[ind[current]].src)+'")'; // enable responsive images (eg through srcset attr)
        }
        else
        {
            p = tiles((imgs[ind[current]].currentSrc||imgs[ind[current]].src), r, c, W, H, angle); // enable responsive images (eg through srcset attr)
        }

        numpiec = p.length;
        if ( transition.current || transition.next )
        {
            imageLayer.style.backgroundImage = 'none';
            p2 = tiles((imgs[ind[prevcurrent]].currentSrc||imgs[ind[prevcurrent]].src), r, c, W, H, angle);
            if ( is_obj(transition.current) && is_array(transition.current.animation) && 2<=transition.current.animation.length )
            {
                animations['animation-'+self.el.id+'-current'] = '@keyframes imagik-animation-'+self.el.id+'-current{'+transition.current.animation.map(function(step, n){
                    return String(100*n/(transition.current.animation.length-1))+'%{'+$css(translate(step, p[0]))+'}';
                }).join("\n")+'}';
            }
            if ( is_obj(transition.next) && is_array(transition.next.animation) && 2<=transition.next.animation.length )
            {
                animations['animation-'+self.el.id+'-next'] = '@keyframes imagik-animation-'+self.el.id+'-next{'+transition.next.animation.map(function(step, n){
                    return String(100*n/(transition.next.animation.length-1))+'%{'+$css(translate(step, p[0]))+'}';
                }).join("\n")+'}';
            }
            for(i=0;i<numpiec;i++)
            {
                if ( !p[i].vis ) continue;
                dd = $el('<div class="imagik-tile-wrapper"></div>');
                p[i].piece.id = self.el.id+'-next-'+p[i].i+'-'+p[i].j;
                p2[i].piece.id = self.el.id+'-current-'+p2[i].i+'-'+p2[i].j;
                $append(dd, $addClass($addClass(p2[i].piece, 'imagik-tile-current'), 'imagik-tile-'+p2[i].i+'-'+p2[i].j));
                $append(dd, $addClass($addClass(p[i].piece, 'imagik-tile-next'), 'imagik-tile-'+p[i].i+'-'+p[i].j));

                if ( is_obj(transition.current) )
                {
                    str = $css(translate(extend({}, transition.current, ['animation','selector','reverse']), p2[i]));
                    if ( str.length ) style += "\n" + '#'+p2[i].piece.id+'{'+str+'}';
                }
                if ( is_obj(transition.next) )
                {
                    str = $css(translate(extend({}, transition.next, ['animation','selector','reverse']), p[i]));
                    if ( str.length ) style += "\n" + '#'+p[i].piece.id+'{'+str+'}';
                }

                p2[i].piece = dd;
                p[i].piece = dd;
            }
        }

        r = p[0].r; c = p[0].c; // re-compute rows/columns if needed
        ordobj = Imagik.Static.order[order](p,r,c);
        p = ordobj.pieces;
        imageLayer.style.zIndex = 0;
        ngroups = ordobj.groups;
        d = fxi.duration/(ngroups-(ngroups-1)*overlap);
        sd = d*(1-overlap);
        max = -1;
        odd = false;

        if ( (is_array(transition.animation) && 2<=transition.animation.length) || (is_array(transition.animation1) && 2<=transition.animation1.length && is_array(transition.animation2) && 2<=transition.animation2.length) )
        {
            if ( transition.animation1 && transition.animation2 )
            {
                animations['animation-'+self.el.id+'-even'] = '@keyframes imagik-animation-'+self.el.id+'-even{'+transition.animation2.map(function(step, n){
                    return String(100*n/(transition.animation2.length-1))+'%{'+$css(translate(step, p[0]))+'}';
                }).join("\n")+'}';
                if ( 1<p.length )
                {
                    animations['animation-'+self.el.id+'-odd'] = '@keyframes imagik-animation-'+self.el.id+'-odd{'+transition.animation1.map(function(step, n){
                        return String(100*n/(transition.animation1.length-1))+'%{'+$css(translate(step, p[1]))+'}';
                    }).join("\n")+'}';
                }
            }
            else
            {
                animations['animation-'+self.el.id] = '@keyframes imagik-animation-'+self.el.id+'{'+transition.animation.map(function(step, n){
                    return String(100*n/(transition.animation.length-1))+'%{'+$css(translate(step, p[0]))+'}';
                }).join("\n")+'}';
            }
        }

        for(i=0;i<numpiec;i++)
        {
            if ( !p[i].vis ) continue;
            del = ordobj.delays[i]*sd;
            p[i].piece.id = self.el.id+'-tile-'+p[i].i+'-'+p[i].j;
            style += "\n" + '#'+p[i].piece.id+'{left:'+p[i].x+p[i].u+';top:'+p[i].y+p[i].u+';width:'+p[i].w+p[i].u+';height:'+p[i].h+p[i].u+';}';
            $append(animationLayer, p[i].piece);
            if ( max<=del )
            {
                if ( transition.next && transition.next.animation )
                    evtCarrier = transition.next.selector ? ($$('#'+p[i].piece.childNodes[1].id+transition.next.selector, animationLayer)[0]||p[i].piece.childNodes[1]) : p[i].piece.childNodes[1];
                else if ( transition.current && transition.current.animation )
                    evtCarrier = transition.current.selector ? ($$('#'+p[i].piece.childNodes[0].id+transition.current.selector, animationLayer)[0]||p[i].piece.childNodes[0]) : p[i].piece.childNodes[0];
                else
                    evtCarrier = selector.length ? ($$('#'+p[i].piece.id+selector, animationLayer)[0]||p[i].piece) : p[i].piece;
                max = del;
            }
            if ( transition.current && transition.current.animation )
            {
                    style += "\n" + '#'+p[i].piece.childNodes[0].id+(transition.current.selector||'')+'{animation:imagik-animation-'+(is_array(transition.current.animation)?(self.el.id+'-current'):String(transition.current.animation))+' '+d+'s '+ease+' '+del+'s 1 '+(transition.current.reverse?'reverse both':'normal both')+' running;}';
            }
            if ( transition.next && transition.next.animation )
            {
                    style += "\n" + '#'+p[i].piece.childNodes[1].id+(transition.next.selector||'')+'{animation:imagik-animation-'+(is_array(transition.next.animation)?(self.el.id+'-next'):String(transition.next.animation))+' '+d+'s '+ease+' '+del+'s 1 '+(transition.next.reverse?'reverse both':'normal both')+' running;}';
            }
            if ( is_array(transition.animation1) && 2<=transition.animation1.length && is_array(transition.animation2) && 2<=transition.animation2.length )
            {
                if ( odd )
                {
                    style += "\n" + '#'+p[i].piece.id+selector+'{animation:imagik-animation-'+self.el.id+'-odd '+d+'s '+ease+' '+del+'s 1 '+(transition.reverse?'reverse both':'normal both')+' running;}';
                }
                else
                {
                    style += "\n" + '#'+p[i].piece.id+selector+'{animation:imagik-animation-'+self.el.id+'-even '+d+'s '+ease+' '+del+'s 1 '+(transition.reverse?'reverse both':'normal both')+' running;}';
                }
            }
            else if ( is_array(transition.animation) && 2<=transition.animation.length )
            {
                style += "\n" + '#'+p[i].piece.id+selector+'{animation:imagik-animation-'+self.el.id+' '+d+'s '+ease+' '+del+'s 1 '+(transition.reverse?'reverse both':'normal both')+' running;}';
            }
            else if ( transition.animation || (transition.animation1 && transition.animation2) )
            {
                if ( transition.animation1 && transition.animation2 )
                {
                    if ( odd )
                    {
                        style += "\n" + '#'+p[i].piece.id+selector+'{animation:imagik-animation-'+String(transition.animation1)+' '+d+'s '+ease+' '+del+'s 1 '+(transition.reverse?'reverse both':'normal both')+' running;}';
                    }
                    else
                    {
                        style += "\n" + '#'+p[i].piece.id+selector+'{animation:imagik-animation-'+String(transition.animation2)+' '+d+'s '+ease+' '+del+'s 1 '+(transition.reverse?'reverse both':'normal both')+' running;}';
                    }
                }
                else
                {
                    style += "\n" + '#'+p[i].piece.id+selector+'{animation:imagik-animation-'+String(transition.animation)+' '+d+'s '+ease+' '+del+'s 1 '+(transition.reverse?'reverse both':'normal both')+' running;}';
                }
            }
            odd = !odd;
        }
        $addClass(animationLayer, 'imagik-fx');
        $addClass(animationLayer, 'imagik-fx-'+lastfx.transition);
        $removeClass(holder, 'imagik-show-image');
        for(i in animations)
        {
            if ( HAS.call(animations, i) )
                style = "\n" + animations[i] + style;
        }
        $style(self.style, style);
        $ev(evtCarrier, 'animationend', endHandler);

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
        $empty(animationLayer);
        $empty(holder);
        $remove(holder);
        $remove(self.style);
        holder = null;
        imageLayer = null;
        animationLayer = null;
        imgs = null;
        self.style = null;
        self.options = null;
        self.el = null;
        return self;
    };

    // go
    self.init();
}
Imagik.VERSION = "1.1.2";
Imagik.Static = {

    transitions: {
        "cubes-left":{
            columns:1,
            current:true,
            next:true,
            animation:[
                {
                    transform:"translate3d(0,0,0) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(0,1.9%,$(-0.2875*X(W))px) rotateY(-4.5deg)"
                }
                ,{
                    transform:"translate3d(0,3.6%,$(-0.55*X(W))px) rotateY(-9deg)"
                }
                ,{
                    transform:"translate3d(0,5.1%,$(-0.7875*X(W))px) rotateY(-13.5deg)"
                }
                ,{
                    transform:"translate3d(0,6.4%,$(-1*X(W))px) rotateY(-18deg)"
                }
                ,{
                    transform:"translate3d(0,7.5%,$(-1.1875*X(W))px) rotateY(-22.5deg)"
                }
                ,{
                    transform:"translate3d(0,8.4%,$(-1.35*X(W))px) rotateY(-27deg)"
                }
                ,{
                    transform:"translate3d(0,9.1%,$(-1.4875*X(W))px) rotateY(-31.5deg)"
                }
                ,{
                    transform:"translate3d(0,9.6%,$(-1.6*X(W))px) rotateY(-36deg)"
                }
                ,{
                    transform:"translate3d(0,9.9%,$(-1.6875*X(W))px) rotateY(-40.5deg)"
                }
                ,{
                    transform:"translate3d(0,10%,$(-1.75*X(W))px) rotateY(-45deg)"
                }
                ,{
                    transform:"translate3d(0,9.9%,$(-1.7875*X(W))px) rotateY(-49.5deg)"
                }
                ,{
                    transform:"translate3d(0,9.6%,$(-1.8*X(W))px) rotateY(-54deg)"
                }
                ,{
                    transform:"translate3d(0,9.1%,$(-1.7875*X(W))px) rotateY(-58.5deg)"
                }
                ,{
                    transform:"translate3d(0,8.4%,$(-1.75*X(W))px) rotateY(-63deg)"
                }
                ,{
                    transform:"translate3d(0,7.5%,$(-1.6875*X(W))px) rotateY(-67.5deg)"
                }
                ,{
                    transform:"translate3d(0,6.4%,$(-1.6*X(W))px) rotateY(-72deg)"
                }
                ,{
                    transform:"translate3d(0,5.1%,$(-1.4875*X(W))px) rotateY(-76.5deg)"
                }
                ,{
                    transform:"translate3d(0,3.6%,$(-1.35*X(W))px) rotateY(-81deg)"
                }
                ,{
                    transform:"translate3d(0,1.9%,$(-1.1875*X(W))px) rotateY(-85.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,-X(W)px) rotateY(-90deg)"
                }
            ]
        }
        ,"cubes-right":{
            columns:1,
            current:true,
            next:true,
            animation:[
                {
                    transform:"translate3d(0,0,0) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(0,1.9%,$(-0.2875*X(W))px) rotateY(4.5deg)"
                }
                ,{
                    transform:"translate3d(0,3.6%,$(-0.55*X(W))px) rotateY(9deg)"
                }
                ,{
                    transform:"translate3d(0,5.1%,$(-0.7875*X(W))px) rotateY(13.5deg)"
                }
                ,{
                    transform:"translate3d(0,6.4%,$(-1*X(W))px) rotateY(18deg)"
                }
                ,{
                    transform:"translate3d(0,7.5%,$(-1.1875*X(W))px) rotateY(22.5deg)"
                }
                ,{
                    transform:"translate3d(0,8.4%,$(-1.35*X(W))px) rotateY(27deg)"
                }
                ,{
                    transform:"translate3d(0,9.1%,$(-1.4875*X(W))px) rotateY(31.5deg)"
                }
                ,{
                    transform:"translate3d(0,9.6%,$(-1.6*X(W))px) rotateY(36deg)"
                }
                ,{
                    transform:"translate3d(0,9.9%,$(-1.6875*X(W))px) rotateY(40.5deg)"
                }
                ,{
                    transform:"translate3d(0,10%,$(-1.75*X(W))px) rotateY(45deg)"
                }
                ,{
                    transform:"translate3d(0,9.9%,$(-1.7875*X(W))px) rotateY(49.5deg)"
                }
                ,{
                    transform:"translate3d(0,9.6%,$(-1.8*X(W))px) rotateY(54deg)"
                }
                ,{
                    transform:"translate3d(0,9.1%,$(-1.7875*X(W))px) rotateY(58.5deg)"
                }
                ,{
                    transform:"translate3d(0,8.4%,$(-1.75*X(W))px) rotateY(63deg)"
                }
                ,{
                    transform:"translate3d(0,7.5%,$(-1.6875*X(W))px) rotateY(67.5deg)"
                }
                ,{
                    transform:"translate3d(0,6.4%,$(-1.6*X(W))px) rotateY(72deg)"
                }
                ,{
                    transform:"translate3d(0,5.1%,$(-1.4875*X(W))px) rotateY(76.5deg)"
                }
                ,{
                    transform:"translate3d(0,3.6%,$(-1.35*X(W))px) rotateY(81deg)"
                }
                ,{
                    transform:"translate3d(0,1.9%,$(-1.1875*X(W))px) rotateY(85.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,-X(W)px) rotateY(90deg)"
                }
            ]
        }
        ,"cubes-up":{
            rows:1,
            current:true,
            next:true,
            animation:[
                {
                    transform:"translate3d(0,0,0) rotateX(0deg)"
                }
                ,{
                    transform:"translate3d(1.9%,0,$(-0.2875*X(H))px) rotateX(4.5deg)"
                }
                ,{
                    transform:"translate3d(3.6%,0,$(-0.55*X(H))px) rotateX(9deg)"
                }
                ,{
                    transform:"translate3d(5.1%,0,$(-0.7875*X(H))px) rotateX(13.5deg)"
                }
                ,{
                    transform:"translate3d(6.4%,0,$(-1*X(H))px) rotateX(18deg)"
                }
                ,{
                    transform:"translate3d(7.5%,0,$(-1.1875*X(H))px) rotateX(22.5deg)"
                }
                ,{
                    transform:"translate3d(8.4%,0,$(-1.35*X(H))px) rotateX(27deg)"
                }
                ,{
                    transform:"translate3d(9.1%,0,$(-1.4875*X(H))px) rotateX(31.5deg)"
                }
                ,{
                    transform:"translate3d(9.6%,0,$(-1.6*X(H))px) rotateX(36deg)"
                }
                ,{
                    transform:"translate3d(9.9%,0,$(-1.6875*X(H))px) rotateX(40.5deg)"
                }
                ,{
                    transform:"translate3d(10%,0,$(-1.75*X(H))px) rotateX(45deg)"
                }
                ,{
                    transform:"translate3d(9.9%,0,$(-1.7875*X(H))px) rotateX(49.5deg)"
                }
                ,{
                    transform:"translate3d(9.6%,0,$(-1.8*X(H))px) rotateX(54deg)"
                }
                ,{
                    transform:"translate3d(9.1%,0,$(-1.7875*X(H))px) rotateX(58.5deg)"
                }
                ,{
                    transform:"translate3d(8.4%,0,$(-1.75*X(H))px) rotateX(63deg)"
                }
                ,{
                    transform:"translate3d(7.5%,0,$(-1.6875*X(H))px) rotateX(67.5deg)"
                }
                ,{
                    transform:"translate3d(6.4%,0,$(-1.6*X(H))px) rotateX(72deg)"
                }
                ,{
                    transform:"translate3d(5.1%,0,$(-1.4875*X(H))px) rotateX(76.5deg)"
                }
                ,{
                    transform:"translate3d(3.6%,0,$(-1.35*X(H))px) rotateX(81deg)"
                }
                ,{
                    transform:"translate3d(1.9%,0,$(-1.1875*X(H))px) rotateX(85.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,-X(H)px) rotateX(90deg)"
                }
            ]
        }
        ,"cubes-down":{
            rows:1,
            current:true,
            next:true,
            animation:[
                {
                    transform:"translate3d(0,0,0) rotateX(0deg)"
                }
                ,{
                    transform:"translate3d(1.9%,0,$(-0.2875*X(H))px) rotateX(-4.5deg)"
                }
                ,{
                    transform:"translate3d(3.6%,0,$(-0.55*X(H))px) rotateX(-9deg)"
                }
                ,{
                    transform:"translate3d(5.1%,0,$(-0.7875*X(H))px) rotateX(-13.5deg)"
                }
                ,{
                    transform:"translate3d(6.4%,0,$(-1*X(H))px) rotateX(-18deg)"
                }
                ,{
                    transform:"translate3d(7.5%,0,$(-1.1875*X(H))px) rotateX(-22.5deg)"
                }
                ,{
                    transform:"translate3d(8.4%,0,$(-1.35*X(H))px) rotateX(-27deg)"
                }
                ,{
                    transform:"translate3d(9.1%,0,$(-1.4875*X(H))px) rotateX(-31.5deg)"
                }
                ,{
                    transform:"translate3d(9.6%,0,$(-1.6*X(H))px) rotateX(-36deg)"
                }
                ,{
                    transform:"translate3d(9.9%,0,$(-1.6875*X(H))px) rotateX(-40.5deg)"
                }
                ,{
                    transform:"translate3d(10%,0,$(-1.75*X(H))px) rotateX(-45deg)"
                }
                ,{
                    transform:"translate3d(9.9%,0,$(-1.7875*X(H))px) rotateX(-49.5deg)"
                }
                ,{
                    transform:"translate3d(9.6%,0,$(-1.8*X(H))px) rotateX(-54deg)"
                }
                ,{
                    transform:"translate3d(9.1%,0,$(-1.7875*X(H))px) rotateX(-58.5deg)"
                }
                ,{
                    transform:"translate3d(8.4%,0,$(-1.75*X(H))px) rotateX(-63deg)"
                }
                ,{
                    transform:"translate3d(7.5%,0,$(-1.6875*X(H))px) rotateX(-67.5deg)"
                }
                ,{
                    transform:"translate3d(6.4%,0,$(-1.6*X(H))px) rotateX(-72deg)"
                }
                ,{
                    transform:"translate3d(5.1%,0,$(-1.4875*X(H))px) rotateX(-76.5deg)"
                }
                ,{
                    transform:"translate3d(3.6%,0,$(-1.35*X(H))px) rotateX(-81deg)"
                }
                ,{
                    transform:"translate3d(1.9%,0,$(-1.1875*X(H))px) rotateX(-85.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,-X(H)px) rotateX(-90deg)"
                }
            ]
        }
        ,"fold-left":{
            rows:1,
            columns:1,
            current:{"transform-origin":"0 center",transform:"translate3d(0,0,-X(W)px) rotateY(0deg)"},
            next:{"transform-origin":"100% center",transform:"translate3d(0,0,0) rotateY(-90deg)"},
            animation:[
                {
                    transform:"translate3d(0,0,X(W)px) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0.7125*X(W))px) rotateY(4.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0.45*X(W))px) rotateY(9deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0.2125*X(W))px) rotateY(13.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0*X(W))px) rotateY(18deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.1875*X(W))px) rotateY(22.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.35*X(W))px) rotateY(27deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.4875*X(W))px) rotateY(31.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6*X(W))px) rotateY(36deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6875*X(W))px) rotateY(40.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.75*X(W))px) rotateY(45deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.7875*X(W))px) rotateY(49.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.8*X(W))px) rotateY(54deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.7875*X(W))px) rotateY(58.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.75*X(W))px) rotateY(63deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6875*X(W))px) rotateY(67.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6*X(W))px) rotateY(72deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.4875*X(W))px) rotateY(76.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.35*X(W))px) rotateY(81deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.1875*X(W))px) rotateY(85.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,0) rotateY(90deg)"
                }
            ]
        }
        ,"fold-right":{
            rows:1,
            columns:1,
            current:{"transform-origin":"0 center",transform:"translate3d(0,0,-X(W)px) rotateY(0deg)"},
            next:{"transform-origin":"0 center",transform:"translate3d(0,0,0) rotateY(90deg)"},
            animation:[
                {
                    transform:"translate3d(0,0,X(W)px) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0.7125*X(W))px) rotateY(-4.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0.45*X(W))px) rotateY(-9deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0.2125*X(W))px) rotateY(-13.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(0*X(W))px) rotateY(-18deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.1875*X(W))px) rotateY(-22.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.35*X(W))px) rotateY(-27deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.4875*X(W))px) rotateY(-31.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6*X(W))px) rotateY(-36deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6875*X(W))px) rotateY(-40.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.75*X(W))px) rotateY(-45deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.7875*X(W))px) rotateY(-49.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.8*X(W))px) rotateY(-54deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.7875*X(W))px) rotateY(-58.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.75*X(W))px) rotateY(-63deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6875*X(W))px) rotateY(-67.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.6*X(W))px) rotateY(-72deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.4875*X(W))px) rotateY(-76.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.35*X(W))px) rotateY(-81deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-0.1875*X(W))px) rotateY(-85.5deg)"
                }
                ,{
                    transform:"translate3d(0,0,0) rotateY(-90deg)"
                }
            ]
        }
        ,"shuffle-left":{
            rows:1,
            columns:1,
            current:{animation:[
                /* Bezier Through (x=25%,rotY=60deg) */
                {
                    transform:"translate3d(0,0,0) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(-6.65%,0,$(-0.05*1.5*X(W))px) rotateY(11.4deg)"
                }
                ,{
                    transform:"translate3d(-12.6%,0,$(-0.10*1.5*X(W))px) rotateY(21.6deg)"
                }
                ,{
                    transform:"translate3d(-17.85%,0,$(-0.15*1.5*X(W))px) rotateY(30.6deg)"
                }
                ,{
                    transform:"translate3d(-22.4%,0,$(-0.20*1.5*X(W))px) rotateY(38.4deg)"
                }
                ,{
                    transform:"translate3d(-26.25%,0,$(-0.25*1.5*X(W))px) rotateY(45deg)"
                }
                ,{
                    transform:"translate3d(-29.4%,0,$(-0.30*1.5*X(W))px) rotateY(50.4deg)"
                }
                ,{
                    transform:"translate3d(-31.85%,0,$(-0.35*1.5*X(W))px) rotateY(54.6deg)"
                }
                ,{
                    transform:"translate3d(-33.6%,0,$(-0.40*1.5*X(W))px) rotateY(57.6deg)"
                }
                ,{
                    transform:"translate3d(-34.65%,0,$(-0.45*1.5*X(W))px) rotateY(59.4deg)"
                }
                ,{
                    transform:"translate3d(-35%,0,$(-0.50*1.5*X(W))px) rotateY(60deg)"
                }
                ,{
                    transform:"translate3d(-34.65%,0,$(-0.55*1.5*X(W))px) rotateY(59.4deg)"
                }
                ,{
                    transform:"translate3d(-33.6%,0,$(-0.60*1.5*X(W))px) rotateY(57.6deg)"
                }
                ,{
                    transform:"translate3d(-31.85%,0,$(-0.65*1.5*X(W))px) rotateY(54.6deg)"
                }
                ,{
                    transform:"translate3d(-29.4%,0,$(-0.70*1.5*X(W))px) rotateY(50.4deg)"
                }
                ,{
                    transform:"translate3d(-26.25%,0,$(-0.75*1.5*X(W))px) rotateY(45deg)"
                }
                ,{
                    transform:"translate3d(-22.4%,0,$(-0.80*1.5*X(W))px) rotateY(38.4deg)"
                }
                ,{
                    transform:"translate3d(-17.85%,0,$(-0.85*1.5*X(W))px) rotateY(30.6deg)"
                }
                ,{
                    transform:"translate3d(-12.6%,0,$(-0.90*1.5*X(W))px) rotateY(21.6deg)"
                }
                ,{
                    transform:"translate3d(-6.65%,0,$(-0.95*1.5*X(W))px) rotateY(11.4deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-1.5*X(W))px) rotateY(0deg)"
                }
            ]},
            next:{animation:[
                /* Bezier Through (x=25%,rotY=60deg) */
                {
                    transform:"translate3d(0,0,$(-1.5*X(W))px) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(6.65%,0,$(-0.95*1.5*X(W))px) rotateY(-11.4deg)"
                }
                ,{
                    transform:"translate3d(12.6%,0,$(-0.90*1.5*X(W))px) rotateY(-21.6deg)"
                }
                ,{
                    transform:"translate3d(17.85%,0,$(-0.85*1.5*X(W))px) rotateY(-30.6deg)"
                }
                ,{
                    transform:"translate3d(22.4%,0,$(-0.80*1.5*X(W))px) rotateY(-38.4deg)"
                }
                ,{
                    transform:"translate3d(26.25%,0,$(-0.75*1.5*X(W))px) rotateY(-45deg)"
                }
                ,{
                    transform:"translate3d(29.4%,0,$(-0.70*1.5*X(W))px) rotateY(-50.4deg)"
                }
                ,{
                    transform:"translate3d(31.85%,0,$(-0.65*1.5*X(W))px) rotateY(-54.6deg)"
                }
                ,{
                    transform:"translate3d(33.6%,0,$(-0.60*1.5*X(W))px) rotateY(-57.6deg)"
                }
                ,{
                    transform:"translate3d(34.65%,0,$(-0.55*1.5*X(W))px) rotateY(-59.4deg)"
                }
                ,{
                    transform:"translate3d(35%,0,$(-0.50*1.5*X(W))px) rotateY(-60deg)"
                }
                ,{
                    transform:"translate3d(34.65%,0,$(-0.45*1.5*X(W))px) rotateY(-59.4deg)"
                }
                ,{
                    transform:"translate3d(33.6%,0,$(-0.40*1.5*X(W))px) rotateY(-57.6deg)"
                }
                ,{
                    transform:"translate3d(31.85%,0,$(-0.35*1.5*X(W))px) rotateY(-54.6deg)"
                }
                ,{
                    transform:"translate3d(29.4%,0,$(-0.30*1.5*X(W))px) rotateY(-50.4deg)"
                }
                ,{
                    transform:"translate3d(26.25%,0,$(-0.25*1.5*X(W))px) rotateY(-45deg)"
                }
                ,{
                    transform:"translate3d(22.4%,0,$(-0.20*1.5*X(W))px) rotateY(-38.4deg)"
                }
                ,{
                    transform:"translate3d(17.85%,0,$(-0.15*1.5*X(W))px) rotateY(-30.6deg)"
                }
                ,{
                    transform:"translate3d(12.6%,0,$(-0.10*1.5*X(W))px) rotateY(-21.6deg)"
                }
                ,{
                    transform:"translate3d(6.65%,0,$(-0.05*1.5*X(W))px) rotateY(-11.4deg)"
                }
                ,{
                    transform:"translate3d(0,0,0) rotateY(0deg)"
                }
            ]}
        }
        ,"shuffle-right":{
            rows:1,
            columns:1,
            current:{animation:[
                /* Bezier Through (x=25%,rotY=60deg) */
                {
                    transform:"translate3d(0,0,0) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(6.65%,0,$(-0.05*1.5*X(W))px) rotateY(-11.4deg)"
                }
                ,{
                    transform:"translate3d(12.6%,0,$(-0.10*1.5*X(W))px) rotateY(-21.6deg)"
                }
                ,{
                    transform:"translate3d(17.85%,0,$(-0.15*1.5*X(W))px) rotateY(-30.6deg)"
                }
                ,{
                    transform:"translate3d(22.4%,0,$(-0.20*1.5*X(W))px) rotateY(-38.4deg)"
                }
                ,{
                    transform:"translate3d(26.25%,0,$(-0.25*1.5*X(W))px) rotateY(-45deg)"
                }
                ,{
                    transform:"translate3d(29.4%,0,$(-0.30*1.5*X(W))px) rotateY(-50.4deg)"
                }
                ,{
                    transform:"translate3d(31.85%,0,$(-0.35*1.5*X(W))px) rotateY(-54.6deg)"
                }
                ,{
                    transform:"translate3d(33.6%,0,$(-0.40*1.5*X(W))px) rotateY(-57.6deg)"
                }
                ,{
                    transform:"translate3d(34.65%,0,$(-0.45*1.5*X(W))px) rotateY(-59.4deg)"
                }
                ,{
                    transform:"translate3d(35%,0,$(-0.50*1.5*X(W))px) rotateY(-60deg)"
                }
                ,{
                    transform:"translate3d(34.65%,0,$(-0.55*1.5*X(W))px) rotateY(-59.4deg)"
                }
                ,{
                    transform:"translate3d(33.6%,0,$(-0.60*1.5*X(W))px) rotateY(-57.6deg)"
                }
                ,{
                    transform:"translate3d(31.85%,0,$(-0.65*1.5*X(W))px) rotateY(-54.6deg)"
                }
                ,{
                    transform:"translate3d(29.4%,0,$(-0.70*1.5*X(W))px) rotateY(-50.4deg)"
                }
                ,{
                    transform:"translate3d(26.25%,0,$(-0.75*1.5*X(W))px) rotateY(-45deg)"
                }
                ,{
                    transform:"translate3d(22.4%,0,$(-0.80*1.5*X(W))px) rotateY(-38.4deg)"
                }
                ,{
                    transform:"translate3d(17.85%,0,$(-0.85*1.5*X(W))px) rotateY(-30.6deg)"
                }
                ,{
                    transform:"translate3d(12.6%,0,$(-0.90*1.5*X(W))px) rotateY(-21.6deg)"
                }
                ,{
                    transform:"translate3d(6.65%,0,$(-0.95*1.5*X(W))px) rotateY(-11.4deg)"
                }
                ,{
                    transform:"translate3d(0,0,$(-1.5*X(W))px) rotateY(0deg)"
                }
            ]},
            next:{animation:[
                /* Bezier Through (x=25%,rotY=60deg) */
                {
                    transform:"translate3d(0,0,$(-1.5*X(W))px) rotateY(0deg)"
                }
                ,{
                    transform:"translate3d(-6.65%,0,$(-0.95*1.5*X(W))px) rotateY(11.4deg)"
                }
                ,{
                    transform:"translate3d(-12.6%,0,$(-0.90*1.5*X(W))px) rotateY(21.6deg)"
                }
                ,{
                    transform:"translate3d(-17.85%,0,$(-0.85*1.5*X(W))px) rotateY(30.6deg)"
                }
                ,{
                    transform:"translate3d(-22.4%,0,$(-0.80*1.5*X(W))px) rotateY(38.4deg)"
                }
                ,{
                    transform:"translate3d(-26.25%,0,$(-0.75*1.5*X(W))px) rotateY(45deg)"
                }
                ,{
                    transform:"translate3d(-29.4%,0,$(-0.70*1.5*X(W))px) rotateY(50.4deg)"
                }
                ,{
                    transform:"translate3d(-31.85%,0,$(-0.65*1.5*X(W))px) rotateY(54.6deg)"
                }
                ,{
                    transform:"translate3d(-33.6%,0,$(-0.60*1.5*X(W))px) rotateY(57.6deg)"
                }
                ,{
                    transform:"translate3d(-34.65%,0,$(-0.55*1.5*X(W))px) rotateY(59.4deg)"
                }
                ,{
                    transform:"translate3d(-35%,0,$(-0.50*1.5*X(W))px) rotateY(60deg)"
                }
                ,{
                    transform:"translate3d(-34.65%,0,$(-0.45*1.5*X(W))px) rotateY(59.4deg)"
                }
                ,{
                    transform:"translate3d(-33.6%,0,$(-0.40*1.5*X(W))px) rotateY(54.6deg)"
                }
                ,{
                    transform:"translate3d(-31.85%,0,$(-0.35*1.5*X(W))px) rotateY(54.6deg)"
                }
                ,{
                    transform:"translate3d(-29.4%,0,$(-0.30*1.5*X(W))px) rotateY(50.4deg)"
                }
                ,{
                    transform:"translate3d(-26.25%,0,$(-0.25*1.5*X(W))px) rotateY(45deg)"
                }
                ,{
                    transform:"translate3d(-22.4%,0,$(-0.20*1.5*X(W))px) rotateY(38.4deg)"
                }
                ,{
                    transform:"translate3d(-17.85%,0,$(-0.15*1.5*X(W))px) rotateY(30.6deg)"
                }
                ,{
                    transform:"translate3d(-12.6%,0,$(-0.10*1.5*X(W))px) rotateY(21.6deg)"
                }
                ,{
                    transform:"translate3d(-6.65%,0,$(-0.05*1.5*X(W))px) rotateY(11.4deg)"
                }
                ,{
                    transform:"translate3d(0,0,0) rotateY(0deg)"
                }
            ]}
        }
        ,"flip-horizontal":{
            current:true,
            next:true,
            animation:"flip-horizontal"
        }
        ,"flip-vertical":{
            current:true,
            next:true,
            animation:"flip-vertical"
        }
        ,"rotate":{
            animation:"rotate"
        }
        ,"rotate-reverse":{
            reverse:true,
            animation:"rotate"
        }
        ,"scale":{
            current:{animation:"scale"},
            next:{animation:"scale",reverse:true}
        }
        ,"iris":{
            rows:1,
            columns:1,
            animation:"iris",
            selector:">.imagik-tile-inside"
        }
        ,"iris-reverse":{
            reverse:true,
            rows:1,
            columns:1,
            animation:"iris",
            selector:">.imagik-tile-inside"
        }
        ,"tv":{
            rows:1,
            columns:1,
            current:{animation:"tv"},
            next:{animation:"tv",reverse:true}
        }
        /*,"motion-blur":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"motion-blur"
        }*/
        ,"brightness":{
            rows:1,
            columns:1,
            current:{animation:"brightness"},
            next:{animation:"brightness",reverse:true}
        }
        ,"darkness":{
            rows:1,
            columns:1,
            current:{animation:"darkness"},
            next:{animation:"darkness",reverse:true}
        }
        ,"fade":{
            animation:"fade"
        }
        ,"fade-rhombus":{
            angle:true,
            animation:"fade"
        }
        ,"fade-zoom":{
            rows:1,
            columns:1,
            current:{animation:"fade-zoom"/*,selector:">.imagik-tile-inside"*/},
            next:{animation:"fade-zoom",reverse:true/*,selector:">.imagik-tile-inside"*/}
        }
        ,"move-diagonal":{
            rows:1,
            angle:30,
            animation1:[
                {
                    transform:"translate3d($(0===X(angle)?'100%':'X(slope)px'),$(0===X(angle)?0:'100%'),0)"
                }
                ,{
                    transform:"translate3d(0,0,0)"
                }
            ]
            ,animation2:[
                {
                    transform:"translate3d($(0===X(angle)?'-100%':'-X(slope)px'),$(0===X(angle)?0:'-100%'),0)"
                }
                ,{
                    transform:"translate3d(0,0,0)"
                }
            ]
        }
        ,"move-diagonal-reverse":{
            rows:1,
            angle:30,
            reverse:true,
            animation1:[
                {
                    transform:"translate3d($(0===X(angle)?'100%':'X(slope)px'),$(0===X(angle)?0:'100%'),0)"
                }
                ,{
                    transform:"translate3d(0,0,0)"
                }
            ]
            ,animation2:[
                {
                    transform:"translate3d($(0===X(angle)?'-100%':'-X(slope)px'),$(0===X(angle)?0:'-100%'),0)"
                }
                ,{
                    transform:"translate3d(0,0,0)"
                }
            ]
        }
        ,"move-down":{
            animation:"move-down"
        }
        ,"move-down-reverse":{
            reverse:true,
            animation:"move-down"
        }
        ,"move-up":{
            animation:"move-up"
        }
        ,"move-up-reverse":{
            reverse:true,
            animation:"move-up"
        }
        ,"move-right":{
            animation:"move-right"
        }
        ,"move-right-reverse":{
            reverse:true,
            animation:"move-right"
        }
        ,"move-left":{
            animation:"move-left"
        }
        ,"move-left-reverse":{
            reverse:true,
            animation:"move-left"
        }
        ,"move-up-down":{
            animation1:"move-down",
            animation2:"move-up"
        }
        ,"move-up-down-reverse":{
            reverse:true,
            animation1:"move-down",
            animation2:"move-up"
        }
        ,"move-left-right":{
            animation1:"move-right",
            animation2:"move-left"
        }
        ,"move-left-right-reverse":{
            reverse:true,
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
            animation:"fade-grow",
            selector:">.imagik-tile-inside"
        }
        ,"fade-shrink":{
            reverse:true,
            animation:"fade-grow",
            selector:">.imagik-tile-inside"
        }
        ,"grow":{
            animation:"grow",
            selector:">.imagik-tile-inside"
        }
        ,"shrink":{
            reverse:true,
            animation:"grow",
            selector:">.imagik-tile-inside"
        }
        ,"grow-horizontal":{
            rows:1,
            animation:"grow-horizontal",
            selector:">.imagik-tile-inside"
        }
        ,"shrink-horizontal":{
            reverse:true,
            rows:1,
            animation:"grow-horizontal",
            selector:">.imagik-tile-inside"
        }
        ,"grow-vertical":{
            columns:1,
            animation:"grow-vertical",
            selector:">.imagik-tile-inside"
        }
        ,"shrink-vertical":{
            reverse:true,
            columns:1,
            animation:"grow-vertical",
            selector:">.imagik-tile-inside"
        }
        ,"fade-grow-horizontal":{
            rows:1,
            animation:"fade-grow-horizontal",
            selector:">.imagik-tile-inside"
        }
        ,"fade-grow-vertical":{
            columns:1,
            animation:"fade-grow-vertical",
            selector:">.imagik-tile-inside"
        }
        ,"blinds-horizontal":{
            current:{animation:"blinds-horizontal-current",selector:">.imagik-tile-inside"},
            next:{animation:"blinds-horizontal-next",selector:">.imagik-tile-inside"}
        }
        ,"blinds-vertical":{
            current:{animation:"blinds-vertical-current",selector:">.imagik-tile-inside"},
            next:{animation:"blinds-vertical-next",selector:">.imagik-tile-inside"}
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
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-top-left"
        }
        ,"pan-top-right":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-top-right"
        }
        ,"pan-bottom-right":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-bottom-right"
        }
        ,"pan-bottom-left":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-bottom-left"
        }
        ,"pan-left":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-left"
        }
        ,"pan-right":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-right"
        }
        ,"pan-top":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-top"
        }
        ,"pan-bottom":{
            current:true,
            next:true,
            rows:1,
            columns:1,
            animation:"pan-bottom"
        }
        ,"pan-left-right":{
            current:true,
            next:true,
            columns:1,
            animation1:"pan-right",
            animation2:"pan-left"
        }
        ,"pan-up-down":{
            current:true,
            next:true,
            rows:1,
            animation1:"pan-top",
            animation2:"pan-bottom"
        }
        ,"pan-diagonal":{
            rows:1,
            angle:30,
            current:{transform:"translate3d(0,0,0)"},
            next:{transform:"translate3d($(0===X(angle)?(X(i)%2?'-100%':'100%'):(X(i)%2?'-X(slope)px':'X(slope)px')),$(0===X(angle)?0:(X(i)%2?'-100%':'100%')),0)"},
            animation1:[
                {
                    transform:"translate3d(0,0,0)"
                }
                ,{
                    transform:"translate3d($(0===X(angle)?'100%':'X(slope)px'),$(0===X(angle)?0:'100%'),0)"
                }
            ]
            ,animation2:[
                {
                    transform:"translate3d(0,0,0)"
                }
                ,{
                    transform:"translate3d($(0===X(angle)?'-100%':'-X(slope)px'),$(0===X(angle)?0:'-100%'),0)"
                }
            ]
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
         {transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"rows-first"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"columns-first"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:5,order:"random"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left-reverse"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right-reverse"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-left"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-right"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-right"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-left"}
        ,{transition:"flip-horizontal",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"random"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"rows-first"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"columns-first"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:1,order:"random"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left-reverse"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right-reverse"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-left"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-right"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-right"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-left"}
        ,{transition:"flip-vertical",ease:"ease-out-back",duration:2,overlap:0.9,rows:5,columns:5,order:"random"}
        ,{transition:"shuffle-left",ease:"ease-in-out",duration:2,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"shuffle-right",ease:"ease-in-out",duration:2,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fold-left",ease:"ease-in-out",duration:2,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fold-right",ease:"ease-in-out",duration:2,overlap:1,rows:1,columns:1,order:"rows-first"}
        ,{transition:"cubes-left",ease:"ease-in-out",duration:2,overlap:0.9,rows:4,columns:1,order:"random"}
        ,{transition:"cubes-right",ease:"ease-in-out",duration:2,overlap:0.9,rows:4,columns:1,order:"random"}
        ,{transition:"cubes-up",ease:"ease-in-out",duration:2,overlap:0.9,rows:1,columns:4,order:"random"}
        ,{transition:"cubes-down",ease:"ease-in-out",duration:2,overlap:0.9,rows:1,columns:4,order:"random"}
        ,{transition:"rotate",ease:"ease-out",duration:2,overlap:1,rows:4,columns:4,order:"columns-first"}
        ,{transition:"rotate-reverse",ease:"ease-out",duration:2,overlap:1,rows:4,columns:4,order:"columns-first"}
        ,{transition:"scale",ease:"ease-in-out-quint",duration:2,overlap:1,rows:3,columns:3,order:"columns-first"}
        ,{transition:"iris",ease:"ease-out",duration:2,rows:1,columns:1,order:"rows-first"}
        ,{transition:"iris-reverse",ease:"ease-out",duration:2,rows:1,columns:1,order:"rows-first"}
        ,{transition:"tv",ease:"ease",duration:2,rows:1,columns:1,order:"rows-first"}
        ,{transition:"brightness",ease:"linear",duration:2,rows:1,columns:1,order:"rows-first"}
        ,{transition:"darkness",ease:"linear",duration:2,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fade-zoom",ease:"ease-out",duration:2,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:1,columns:1,order:"rows-first"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"rows-first"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"columns-first"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-left"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-right"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-right"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-left"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:1,columns:5,order:"random"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:1,order:"random"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"random"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left-reverse"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right-reverse"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"left-right"}
        ,{transition:"fade",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"up-down"}
        ,{transition:"fade-rhombus",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"random"}
        ,{transition:"fade-rhombus",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"left-right"}
        ,{transition:"fade-rhombus",ease:"ease-in",duration:2,overlap:0.9,rows:5,columns:5,order:"up-down"}
        ,{transition:"grow-horizontal",ease:"ease-out",duration:2,overlap:0.9,rows:1,columns:5,order:"random"}
        ,{transition:"grow-vertical",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:1,order:"random"}
        ,{transition:"fade-grow-horizontal",ease:"ease-out",duration:2,overlap:0.9,rows:1,columns:5,order:"random"}
        ,{transition:"fade-grow-vertical",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:1,order:"random"}
        ,{transition:"grow",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"rows-first"}
        ,{transition:"shrink",ease:"ease-out",duration:2,overlap:1,rows:5,columns:5,order:"columns-first"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"left-right"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"up-down"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"random"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-top-left-reverse"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"spiral-bottom-right-reverse"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-top-left"}
        ,{transition:"fade-shrink",ease:"ease-out",duration:2,overlap:0.9,rows:5,columns:5,order:"diagonal-bottom-right"}
        ,{transition:"move-diagonal",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:5,order:"random"}
        ,{transition:"move-diagonal-reverse",ease:"ease-in-back",duration:2,overlap:0.9,rows:1,columns:5,order:"random"}
        ,{transition:"move-left-right",ease:"ease-out-back",duration:2,overlap:0.8,rows:5,columns:1,order:"rows-first"}
        ,{transition:"move-left-right",ease:"ease",duration:2,overlap:1,rows:2,columns:1,order:"rows-first"}
        ,{transition:"move-left-right-reverse",ease:"ease-in-back",duration:2,overlap:0.8,rows:5,columns:1,order:"rows-first"}
        ,{transition:"move-right",ease:"ease-out-back",duration:2,overlap:0.8,rows:5,columns:1,order:"rows-first"}
        ,{transition:"move-right-reverse",ease:"ease-in-back",duration:2,overlap:0.8,rows:5,columns:1,order:"rows-first"}
        ,{transition:"move-left",ease:"ease-out-back",duration:2,overlap:0.8,rows:5,columns:1,order:"rows-first"}
        ,{transition:"move-left-reverse",ease:"ease-in-back",duration:2,overlap:0.8,rows:5,columns:1,order:"rows-first"}
        ,{transition:"move-up-down",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:5,order:"columns-first"}
        ,{transition:"move-up-down",ease:"ease",duration:2,overlap:1,rows:1,columns:2,order:"columns-first"}
        ,{transition:"move-up-down-reverse",ease:"ease-in-back",duration:2,overlap:0.9,rows:1,columns:5,order:"columns-first"}
        ,{transition:"move-up",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:5,order:"columns-first"}
        ,{transition:"move-up-reverse",ease:"ease-in-back",duration:2,overlap:0.9,rows:1,columns:5,order:"columns-first"}
        ,{transition:"move-down",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:5,order:"columns-first"}
        ,{transition:"move-down-reverse",ease:"ease-in-back",duration:2,overlap:0.9,rows:1,columns:5,order:"columns-first"}
        ,{transition:"fly-top-left",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-bottom-right",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-left",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-right",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-top",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"fly-bottom",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-top-left",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-bottom-right",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-left",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-right",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-top",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-bottom",ease:"ease-out-back",duration:2,overlap:0.9,rows:1,columns:1,order:"columns-first"}
        ,{transition:"pan-left-right",ease:"ease-out-quint",duration:2,overlap:1,rows:2,columns:1,order:"rows-first"}
        ,{transition:"pan-left-right",ease:"ease-out-quint",duration:2,overlap:1,rows:3,columns:1,order:"rows-first"}
        ,{transition:"pan-up-down",ease:"ease-out-quint",duration:2,overlap:1,rows:1,columns:2,order:"columns-first"}
        ,{transition:"pan-up-down",ease:"ease-out-quint",duration:2,overlap:1,rows:1,columns:3,order:"columns-first"}
        ,{transition:"pan-diagonal",ease:"ease-out-quint",duration:2,overlap:1,rows:1,columns:2,order:"columns-first"}
        ,{transition:"pan-diagonal",ease:"ease-out-quint",duration:2,overlap:1,rows:1,columns:3,order:"columns-first"}
        ,{transition:"pan-diagonal",ease:"ease-out-quint",duration:2,overlap:1,rows:1,columns:4,order:"columns-first"}
        ,{transition:"blinds-horizontal",ease:"ease-in-out-quint",duration:2,overlap:0.5,rows:5,columns:5,order:"checkerboard"}
        ,{transition:"blinds-horizontal",ease:"ease-in-out-quint",duration:2,overlap:1,rows:1,columns:5,order:"random"}
        ,{transition:"blinds-vertical",ease:"ease-in-out-quint",duration:2,overlap:0.5,rows:5,columns:5,order:"checkerboard"}
        ,{transition:"blinds-vertical",ease:"ease-in-out-quint",duration:2,overlap:1,rows:5,columns:1,order:"random"}
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