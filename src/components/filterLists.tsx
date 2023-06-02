import {styled} from "@mui/system";
import TabUnstyled, {tabUnstyledClasses} from "@mui/base/TabUnstyled";
import {buttonUnstyledClasses} from "@mui/base/ButtonUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";

export type SelectType = {
    id?: number;
    name: string;
    value: string;
    description?: string;
}
const genres_list: SelectType[] = [
    {id: 0, name: 'All', value: ''},
    {id: 1, name: 'Action', value: 'Action'},
    {id: 2, name: 'Adventure', value: 'Adventure'},
    {id: 3, name: 'Animation', value: 'Animation'},
    {id: 4, name: 'Biography', value: 'Biography'},
    {id: 5, name: 'Comedy', value: 'Comedy'},
    {id: 6, name: 'Crime', value: 'Crime'},
    {id: 7, name: 'Documentary', value: 'Documentary'},
    {id: 8, name: 'Drama', value: 'Drama'},
    {id: 9, name: 'Family', value: 'Family'},
    {id: 10, name: 'Fantasy', value: 'Fantasy'},
    {id: 11, name: 'Film Noir', value: 'Film Noir'},
    {id: 12, name: 'History', value: 'History'},
    {id: 13, name: 'Horror', value: 'Horror'},
    {id: 14, name: 'Music', value: 'Music'},
    {id: 15, name: 'Musical', value: 'Musical'},
    {id: 16, name: 'Mystery', value: 'Mystery'},
    {id: 17, name: 'Romance', value: 'Romance'},
    {id: 18, name: 'Sci-Fi', value: 'Sci-Fi'},
    {id: 19, name: 'Short Film', value: 'Short Film'},
    {id: 20, name: 'Sport', value: 'Sport'},
    {id: 21, name: 'Superhero', value: 'Superhero'},
    {id: 22, name: 'Thriller', value: 'Thriller'},
    {id: 23, name: 'War', value: 'War'},
    {id: 24, name: 'Western', value: 'Western'},

]

const sort_by_list: SelectType[] = [
    {name: 'All', value: ''},
    {name: 'Title', value: 'title'},
    {name: 'Year', value: 'year'},
    {name: 'Rating', value: 'rating'},
    {name: 'Peers', value: 'peers'},
    {name: 'Seeds', value: 'seeds'},
    {name: 'Most Downloaded', value: 'download_count'},
    {name: 'Most Liked', value: 'like_count'},
    {name: 'Date Added', value: 'date_added'},
]

const order: SelectType[] = [
    {name: 'Ascending', value: 'asc', description: 'Sort in ascending order'},
    {name: 'Descending', value: 'desc', description: 'Sort in descending order'},
]
const rating_list: SelectType[] = [
    {name: 'All', value: ''},
    {name: '9', value: '9'},
    {name: '8', value: '8'},
    {name: '7', value: '7'},
    {name: '6', value: '6'},
    {name: '5', value: '5'},
    {name: '4', value: '4'},
    {name: '3', value: '3'},
    {name: '2', value: '2'},
    {name: '1', value: '1'},
]
const quality_list: SelectType[] = [
    {name: 'All', value: ''},
    {name: '720p', value: '720p'},
    {name: '1080p', value: '1080p'},
    {name: '3D', value: '3D'},
    {name: '4K', value: '4K'},
]
const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export {genres_list, sort_by_list, rating_list, quality_list, TabsList, Tab, blue, order};