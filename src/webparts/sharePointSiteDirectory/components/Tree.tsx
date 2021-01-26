import * as React from 'react';
import { Treebeard } from 'react-treebeard';
import decorators from 'react-treebeard/dist/components/Decorators';
import defaultTheme from "react-treebeard/dist/themes/default";
import TreeItem from './TreeItem';
import './Tree.module.css';
// import { ActivityItem } from 'office-ui-fabric-react';

const mcc = 'color:aqua;';
let allSites = [];
let allWebs = [];
let _toggleAll = '';

export interface TreeProps {
    root: any;
    sites: any;
    webs: any;
    toggleAll?: string;
}

export interface TreeState {
    cursor?: any;
    data?: any;
    toggleAll?: string;
}

class CutomContainer extends decorators.Container {

    public myProps;

    public constructor(props) {
        super(props);
        // console.log('%c : CutomContainer -> constructor -> props', mcc, props);
        this.myProps = props;
    }

    // public _onClick(e) {
    //     console.log('%c : CutomContainer -> _onClick -> e', mcc, e.target);

    // }

    public render() {
        const { onClick, node } = this.myProps;
        // console.log('%c : CutomContainer -> render -> this.myProps', mcc, this.myProps);
        // console.log('%c : CutomContainer -> render -> node', mcc, node);

        // console.log('%c : CutomContainer -> render -> allSites', mcc, allSites);
        const me = allSites.filter(s => s.Id ? s.Id == node.id : s.SiteID == node.id)[0]
            || allWebs.filter(w => w.WebId == node.id)[0];
        // console.log('%c : CutomContainer -> render -> me', mcc, me);
        const author = me && me.DisplayAuthor ? me.DisplayAuthor : null;
        const template = me && me.SiteTemplate && me.SiteTemplate != 'STS' && me.SiteTemplate != 'SPSPERS' && me.SiteTemplate != 'GROUP' ? me.SiteTemplate : null;
        const created = me && me.CreatedOWSDate ? me.CreatedOWSDate : me && me.Created ? me.Created : null;
        const url = me && me.Url ? me.Url.split('ntandem').join('<span class="blur">ntandem</span>')
            : me && me.SPWebUrl ? me.SPWebUrl.split('ntandem').join('<span class="blur">ntandem</span>')
                : me && me.SPSiteUrl ? me.SPSiteUrl.split('ntandem').join('<span class="blur">ntandem</span>')
                    : null;

        console.log('%c : CutomContainer -> render -> _toggleAll', mcc, _toggleAll);
        const _toggled =
            _toggleAll == 'Expand all' ? true
                : _toggleAll == 'Collapse all' ? false
                    : node.toggled;
        console.log('%c : CutomContainer -> render -> _toggled', mcc, _toggled);

        const kidCount =
            me && me.Id ? allSites.length - 1
                : node.children ? node.children.length
                    : 0;

        const kidType =
            kidCount
                ? me && me.Id ? ' site collections'
                    : me && me.SiteID ? ' subsites'
                        : ' site collections'
                : '';

        return (
            <div
                // onClick={(e) => this._onClick(e)}
                onClick={onClick}
                className='treeItemContainer'
            >
                <TreeItem
                    name={node.name}
                    id={node.id}
                    author={author}
                    template={template}
                    created={created}
                    url={url}
                    toggled={_toggled}
                    hasKids={node.children && node.children.length}
                    kidCount={kidCount}
                    kidType={kidType}
                />
            </div>
        );
    }
}





class Tree extends React.Component<TreeProps, TreeState> {

    public constructor(props: TreeProps) {
        super(props);

        // _toggleAll = this.props.toggleAll;

        let theData = {
            id: this.props.root.Id,
            name: this.props.root.Title,
            toggled: true,
            children: [
                {
                    id: 'team',
                    name: 'Team Sites',
                    children: []
                },
                {
                    id: 'pers',
                    name: 'Personal Sites',
                    children: []
                },
                {
                    id: 'group',
                    name: 'Group Sites',
                    children: []
                },
                {
                    id: 'misc',
                    name: 'Other Sites',
                    children: []
                }
            ]
        };
        // console.log('%c : Tree -> constructor -> theData', mcc, theData);

        this.props.sites.map(s => {
            // console.log('%c : Tree -> constructor -> s.SiteID', mcc, s.SiteID + ' (' + s.Title + ')');
            const myChildWebs = this.props.webs.filter(w => w.SiteID == s.SiteID);
            // console.log('%c : Tree -> constructor -> myChildWebs', mcc, myChildWebs);
            let myKids = [];
            myChildWebs.map(k => {
                myKids.push(
                    {
                        id: k.WebId,
                        name: k.Title
                    }
                );
            });
            // console.log('%c : Tree -> constructor -> myKids', mcc, myKids);
            const dadsKids = theData.children;
            if (s.SiteTemplate == 'STS') {
                dadsKids.filter(c => c.id == 'team')[0].children.push({
                    id: s.SiteID,
                    name: s.Title,
                    children: myKids
                });
            }
            else if (s.SiteTemplate == 'SPSPERS') {
                dadsKids.filter(c => c.id == 'pers')[0].children.push({
                    id: s.SiteID,
                    name: s.Title,
                    children: myKids
                });
            }
            else if (s.SiteTemplate == 'GROUP') {
                dadsKids.filter(c => c.id == 'group')[0].children.push({
                    id: s.SiteID,
                    name: s.Title,
                    children: myKids
                });
            }
            else {
                dadsKids.filter(c => c.id == 'misc')[0].children.push({
                    id: s.SiteID,
                    name: s.Title,
                    children: myKids
                });
            }

        });
        console.log('%c : Tree -> constructor -> theData', mcc, theData);

        allSites.push(this.props.root, ...this.props.sites);
        console.log('%c : Tree -> constructor -> allSites', mcc, allSites);

        allWebs.push(...this.props.webs);

        this.state = {
            cursor: null,
            data: theData
        };
        this.onToggle = this.onToggle.bind(this);

    }

    public componentDidMount() {
        console.log('%c : Tree -> componentDidMount -> this.props', mcc, this.props);
    }

    public componentDidUpdate(prevProps: TreeProps, prevState: TreeState) {
        if (prevProps !== this.props) console.log('%c : Tree -> componentDidUpdate -> this.props', mcc, this.props);
        if (prevState !== this.state) console.log('%c : Tree -> componentDidUpdate -> this.state', mcc, this.state);
        if (prevState.toggleAll != this.props.toggleAll) {
            _toggleAll = this.props.toggleAll;
            this.setState({ toggleAll: this.props.toggleAll });
        }
    }

    public onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
            // this.setState({ cursor[active]: false  });
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({ cursor: node });
    }



    public render() {

        console.log('asdf');

        // decorators.Header = CustomHeader;
        decorators.Container = CutomContainer;

        defaultTheme.tree.base = {
            ...defaultTheme.tree.base,
            color: '#555',
            backgroundColor: '#fff'
        };

        return (
            <Treebeard
                key={this.state.toggleAll ? this.state.toggleAll.replace(/ /g, '') : 1}
                data={this.state.data}
                decorators={decorators}
                style={defaultTheme}
                onToggle={(node, toggled) => {
                    if (this.state.cursor) {
                        this.state.cursor.active = false;
                    }
                    node.active = true;
                    if (node.children) {
                        node.toggled = toggled;
                    }
                    this.setState({ cursor: node });
                }}
            />
        );
    }
}

export default Tree;