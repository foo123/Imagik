declare function Imagik(el: any, options: any): any;

declare namespace Imagik {
    const VERSION: string;
    namespace Static {
        const ease: {
            ease: string;
            "ease-in": string;
            "ease-in-back": string;
            "ease-in-circ": string;
            "ease-in-cubic": string;
            "ease-in-expo": string;
            "ease-in-out": string;
            "ease-in-out-back": string;
            "ease-in-out-circ": string;
            "ease-in-out-cubic": string;
            "ease-in-out-expo": string;
            "ease-in-out-quad": string;
            "ease-in-out-quart": string;
            "ease-in-out-quint": string;
            "ease-in-out-sine": string;
            "ease-in-quad": string;
            "ease-in-quart": string;
            "ease-in-quint": string;
            "ease-in-sine": string;
            "ease-out": string;
            "ease-out-back": string;
            "ease-out-circ": string;
            "ease-out-cubic": string;
            "ease-out-expo": string;
            "ease-out-quad": string;
            "ease-out-quart": string;
            "ease-out-quint": string;
            "ease-out-sine": string;
            linear: string;
        };
        const randomTransitions: {
            columns: number;
            duration: number;
            ease: string;
            order: string;
            overlap: number;
            rows: number;
            transition: string;
        }[];
        const transitions: {
            "blinds-horizontal": {
                current: {
                    animation: string;
                    selector: string;
                };
                next: {
                    animation: string;
                    selector: string;
                };
            };
            "blinds-vertical": {
                current: {
                    animation: string;
                    selector: string;
                };
                next: {
                    animation: string;
                    selector: string;
                };
            };
            brightness: {
                columns: number;
                current: {
                    animation: string;
                };
                next: {
                    animation: string;
                    reverse: boolean;
                };
                rows: number;
            };
            "cubes-down": {
                animation: {
                    transform: string;
                }[];
                current: boolean;
                next: boolean;
                rows: number;
            };
            "cubes-left": {
                animation: {
                    transform: string;
                }[];
                columns: number;
                current: boolean;
                next: boolean;
            };
            "cubes-right": {
                animation: {
                    transform: string;
                }[];
                columns: number;
                current: boolean;
                next: boolean;
            };
            "cubes-up": {
                animation: {
                    transform: string;
                }[];
                current: boolean;
                next: boolean;
                rows: number;
            };
            darkness: {
                columns: number;
                current: {
                    animation: string;
                };
                next: {
                    animation: string;
                    reverse: boolean;
                };
                rows: number;
            };
            fade: {
                animation: string;
            };
            "fade-grow": {
                animation: string;
                selector: string;
            };
            "fade-grow-horizontal": {
                animation: string;
                rows: number;
                selector: string;
            };
            "fade-grow-vertical": {
                animation: string;
                columns: number;
                selector: string;
            };
            "fade-rhombus": {
                angle: boolean;
                animation: string;
            };
            "fade-shrink": {
                animation: string;
                reverse: boolean;
                selector: string;
            };
            "fade-zoom": {
                columns: number;
                current: {
                    animation: string;
                };
                next: {
                    animation: string;
                    reverse: boolean;
                };
                rows: number;
            };
            "flip-horizontal": {
                animation: string;
                current: boolean;
                next: boolean;
            };
            "flip-vertical": {
                animation: string;
                current: boolean;
                next: boolean;
            };
            "fly-bottom": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-bottom-left": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-bottom-right": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-left": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-right": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-top": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-top-left": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fly-top-right": {
                animation: string;
                columns: number;
                rows: number;
            };
            "fold-left": {
                animation: {
                    transform: string;
                }[];
                columns: number;
                current: {
                    transform: string;
                    "transform-origin": string;
                };
                next: {
                    transform: string;
                    "transform-origin": string;
                };
                rows: number;
            };
            "fold-right": {
                animation: {
                    transform: string;
                }[];
                columns: number;
                current: {
                    transform: string;
                    "transform-origin": string;
                };
                next: {
                    transform: string;
                    "transform-origin": string;
                };
                rows: number;
            };
            grow: {
                animation: string;
                selector: string;
            };
            "grow-horizontal": {
                animation: string;
                rows: number;
                selector: string;
            };
            "grow-vertical": {
                animation: string;
                columns: number;
                selector: string;
            };
            iris: {
                animation: string;
                columns: number;
                rows: number;
                selector: string;
            };
            "iris-reverse": {
                animation: string;
                columns: number;
                reverse: boolean;
                rows: number;
                selector: string;
            };
            "move-diagonal": {
                angle: number;
                animation1: {
                    transform: string;
                }[];
                animation2: {
                    transform: string;
                }[];
                rows: number;
            };
            "move-diagonal-reverse": {
                angle: number;
                animation1: {
                    transform: string;
                }[];
                animation2: {
                    transform: string;
                }[];
                reverse: boolean;
                rows: number;
            };
            "move-down": {
                animation: string;
            };
            "move-down-reverse": {
                animation: string;
                reverse: boolean;
            };
            "move-fade-down": {
                animation: string;
            };
            "move-fade-left": {
                animation: string;
            };
            "move-fade-left-right": {
                animation1: string;
                animation2: string;
            };
            "move-fade-right": {
                animation: string;
            };
            "move-fade-up": {
                animation: string;
            };
            "move-fade-up-down": {
                animation1: string;
                animation2: string;
            };
            "move-left": {
                animation: string;
            };
            "move-left-reverse": {
                animation: string;
                reverse: boolean;
            };
            "move-left-right": {
                animation1: string;
                animation2: string;
            };
            "move-left-right-reverse": {
                animation1: string;
                animation2: string;
                reverse: boolean;
            };
            "move-right": {
                animation: string;
            };
            "move-right-reverse": {
                animation: string;
                reverse: boolean;
            };
            "move-up": {
                animation: string;
            };
            "move-up-down": {
                animation1: string;
                animation2: string;
            };
            "move-up-down-reverse": {
                animation1: string;
                animation2: string;
                reverse: boolean;
            };
            "move-up-reverse": {
                animation: string;
                reverse: boolean;
            };
            "pan-bottom": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-bottom-left": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-bottom-right": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-diagonal": {
                angle: number;
                animation1: {
                    transform: string;
                }[];
                animation2: {
                    transform: string;
                }[];
                current: {
                    transform: string;
                };
                next: {
                    transform: string;
                };
                rows: number;
            };
            "pan-left": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-left-right": {
                animation1: string;
                animation2: string;
                columns: number;
                current: boolean;
                next: boolean;
            };
            "pan-right": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-top": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-top-left": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-top-right": {
                animation: string;
                columns: number;
                current: boolean;
                next: boolean;
                rows: number;
            };
            "pan-up-down": {
                animation1: string;
                animation2: string;
                current: boolean;
                next: boolean;
                rows: number;
            };
            rotate: {
                animation: string;
            };
            "rotate-reverse": {
                animation: string;
                reverse: boolean;
            };
            scale: {
                current: {
                    animation: string;
                };
                next: {
                    animation: string;
                    reverse: boolean;
                };
            };
            shrink: {
                animation: string;
                reverse: boolean;
                selector: string;
            };
            "shrink-horizontal": {
                animation: string;
                reverse: boolean;
                rows: number;
                selector: string;
            };
            "shrink-vertical": {
                animation: string;
                columns: number;
                reverse: boolean;
                selector: string;
            };
            "shuffle-left": {
                columns: number;
                current: {
                    animation: {
                        transform: string;
                    }[];
                };
                next: {
                    animation: {
                        transform: string;
                    }[];
                };
                rows: number;
            };
            "shuffle-right": {
                columns: number;
                current: {
                    animation: {
                        transform: string;
                    }[];
                };
                next: {
                    animation: {
                        transform: string;
                    }[];
                };
                rows: number;
            };
            tv: {
                columns: number;
                current: {
                    animation: string;
                };
                next: {
                    animation: string;
                    reverse: boolean;
                };
                rows: number;
            };
        };
        function extend(o1: any, o2: any, ignore: any): any;
        function linearArray(howmany: any): any;
        function shuffle(a: any): any;
        function tiles(img: any, rows: any, columns: any, W: any, H: any, angle: any): any;
        function translate(where: any, what: any): any;
        namespace order {
            function checkerboard(pieces: any, rows: any, columns: any): any;
            function columns(pieces: any, rowsi: any, columnsi: any): any;
            function random(pieces: any, rows: any, columns: any): any;
            function rows(pieces: any, rowsi: any, columnsi: any): any;
        }
    }
}
