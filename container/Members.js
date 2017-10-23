//@flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList} from 'react-native';
import {bindActionCreators, type Dispatch} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem, SearchBar, ButtonGroup} from 'react-native-elements';
import {getMembersPage1, getMembersPage2, getMembersSearch} from '../actions/member';
import type {State} from '../types/State';
import type {
    Action,
    GET_MEMBERS_ACTION,
    SEARCH_MEMBERS_ACTION
} from '../types/Action';
import type {Member} from '../types/Member';

type MemberState = {
  selectedFilter: number
}

type Props = {
  member: Member,
  actions: {
      getMembersPage1: () => GET_MEMBERS_ACTION,
      getMembersPage2: () => GET_MEMBERS_ACTION,
      getMembersSearch: (string, number) => SEARCH_MEMBERS_ACTION,
    }
};

class Members extends Component<Props, MemberState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedFilter: 0
        };
    }

    //$FlowFixMe
    async componentDidMount() {
        await this.props.actions.getMembersPage1();
        this.props.actions.getMembersPage2();
    }

     _keyExtractor = (item: Member) => item._id

     _renderMember = ({item}: {item: Member}) => {
         return (
             <ListItem
                 roundAvatar={true}
                 title={`${item.first_name} ${item.last_name}`}
                 subtitle={item.email}
                 avatar={{uri: item.image_url}}
             />
         );
     };

     _changeFilter = (selectedFilter: number) => this.setState({selectedFilter});

     _search = (text: string) => {
         const {selectedFilter} = this.state;
         if (selectedFilter === 0) {
             const searchText: string = (text).toLowerCase();
             this.props.actions.getMembersSearch(searchText, 0);
         } else if (selectedFilter === 1) {
             this.props.actions.getMembersSearch(text, 1);
         } else if (selectedFilter === 2) {
             this.props.actions.getMembersSearch(text, 2);
         }
     }

     render() {
         const buttons = ['Email', 'First Name', 'Last Name'];
         const {selectedFilter} = this.state;
         return (
             <List style={styles.container}>
                 <ListItem
                     title={
                         <SearchBar
                             lightTheme={true}
                             placeholder='Type Here...'
                             onChangeText={(text: string) => this._search(text)}
                         />
                     }
                 />
                 <ButtonGroup
                     onPress={(val) => this._changeFilter(val)}
                     selectedIndex={selectedFilter}
                     buttons={buttons}
                 />
                 <FlatList
                     data={this.props.member}
                     keyExtractor={this._keyExtractor}
                     renderItem={this._renderMember}
                 />
             </List>
         );
     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
    }
});

const {func, shape, array} = PropTypes;
Members.propTypes = {
    actions: shape({
        getMembersPage1: func.isRequired,
        getMembersPage2: func.isRequired,
        getMembersSearch: func.isRequired
    }),
    member: array.isRequired
};

const mapStateToProps = (state: State) => ({
    member: state.memberReducer
});

const mapDispatchToProps = (dispatch: Dispatch<State, Action>) => ({
    actions: bindActionCreators({
        getMembersPage1,
        getMembersPage2,
        getMembersSearch
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
