import React from "react";
import Downshift from "downshift";

import { Redirect, Link } from "react-router-dom";

//const items = ["apple", "pear", "orange", "grape", "banana"];

class MyDownshift extends React.Component {
  componentDidMount() {
    this.props.filterPosts();
  }

  render() {
    const { posts } = this.props.posts_filtered;
    return (
      <Downshift
        onChange={selection => {
          console.log(`You selected ${selection.title}`);
        }}
        itemToString={i => (i == null ? "" : String(i.title))}
        onOuterClick={() => this.setState({ menuIsOpen: false })}
        render={({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            {isOpen ? (
              <div>
                {posts
                  .filter(
                    i =>
                      !inputValue ||
                      i.category
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      i.title.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      <Link to={`/${item.slug}`}>{item.title}</Link>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default MyDownshift;
