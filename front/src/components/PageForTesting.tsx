import React, {ClassAttributes, Component, CSSProperties} from "react";

const CanvasContext = React.createContext([]);

type CanvasLayerProps = {
    layer?: number
    ref?: React.RefObject<CanvasLayer>
}

class CanvasLayer extends Component<CanvasLayerProps, any> {
    render() {
        const canvasStyle: CSSProperties = {
            position: 'absolute',
            backgroundColor: 'transparent',
            marginLeft: 'auto',
            marginRight: 'auto',
            top: '0',
            left: '0'
        }

        console.log(this.props.layer);

        return <canvas style={canvasStyle} />;
    }
}

type LayeredCanvasProps = {
    children: React.ReactElement<CanvasLayer>[] | React.ReactElement<CanvasLayer>;
}

class LayeredCanvas extends Component<LayeredCanvasProps, any>{
    render() {
        const viewportStyle: CSSProperties = {
            position: 'relative',
            width: '100%',
            height: '800px',
            border: '1px solid'
        }

        // if (Array.isArray(this.props.children)) {
        //     console.warn('array');
        //
        //     const children = React.Children.map(this.props.children,
        //             child => React.cloneElement(child as React.ReactElement<any>, { layer: 0 }));
        //
        // } else {
        //     console.warn('single');
        // }
        //  as React.ReactElement<CanvasLayer>

        // const children = React.Children.map<React.ReactNode, React.ReactElement<CanvasLayer>>(this.props.children,
        //     (child: React.ReactElement<CanvasLayer>) => React.cloneElement(child, { layer: 0 }));

        // const children = React.Children.map(this.props.children,
        //     (child: React.ReactElement<CanvasLayer>, i) => {
        //     const props: CanvasLayerProps = { layer: i };
        //     return React.cloneElement(child, props);
        // });

        const fn = (child: React.ReactElement<CanvasLayer>, i: number) => {
            const props: CanvasLayerProps = { layer: i };
            // @ts-ignore
            return React.cloneElement<CanvasLayer>(child, { layer: i });
        };
        const children = React.Children.map(this.props.children, fn);

        return <div id="viewport" style={viewportStyle}>
            { children }
        </div>;
    }
}

class PageForTesting extends Component<any, any>{
    private l1: React.RefObject<HTMLCanvasElement>;
    private canvas: React.RefObject<CanvasLayer>;

    constructor(props: any) {
        super(props);

        this.l1 = React.createRef<HTMLCanvasElement>();
        this.canvas = React.createRef<CanvasLayer>();
    }


    componentDidMount() {
        const l1 = this.l1.current;
        if (l1) {
            const ctx = l1.getContext('2d');
            ctx?.fillRect(0, 0, 100, 100);
        }

        // @ts-ignore
        console.log(this.canvas.current.props.children);
    }

    render() {
        // return <div id="viewport" style={viewportStyle}>
        //     <canvas id="layer1" ref={this.l1} style={canvasStyle} />
        //     <canvas id="layer2" style={canvasStyle} />
        // </div>;
        // @ts-ignore
        return <LayeredCanvas ref={this.canvas}>
            <CanvasLayer />
            <CanvasLayer />
        </LayeredCanvas>
    }
}

export default PageForTesting;
