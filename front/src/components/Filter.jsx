const Filter = ({ nameContains, handleFilterChange }) => {
    return (
        <div>
          filter shown with: <input value={nameContains} onChange={handleFilterChange} />
        </div>
    )
  }

export default Filter