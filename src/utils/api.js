export const fetchCategories = async () => {
  try {
    let data = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
            query {
                categories {
                  name
                }
            }
        `,
      }),
    });
    data = await data.json();
    return data;
  } catch (error) {
    return { error: error.message || 'Something terrible happened' };
  }
};

export const fetchCurrencies = async () => {
  try {
    let data = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
              currencies{
                  label
                  symbol
              }
          }
      `,
      }),
    });
    data = await data.json();
    return data;
  } catch (error) {
    return { error: error.message || 'Something terrible happened' };
  }
};

export const fetchProducts = async (category) => {
  try {
    let data = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            category(input :{title : "${category}"}){
              name
              products {
                id
                name
                brand
                inStock
                gallery
                prices{
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                attributes{
                  id
                  name 
                  type 
                  items {
                    id
                    displayValue
                    value
                  }
                }
              }
            }
          }
      `,
      }),
    });
    data = await data.json();
    return data;
  } catch (error) {
    return { error: error.message || 'Something terrible happened' };
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    let data = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            product(id :"${productId}") {
              name 
              inStock
              gallery
              description
              category
              prices{
                amount
                currency {
                  label
                  symbol
                }
              }
              brand
              attributes{
                id
                name 
                type 
                items {
                  id
                  displayValue
                  value
                }
              }   
            }
          }
      `,
      }),
    });
    data = await data.json();
    return data;
  } catch (error) {
    return { error: error.message || 'Something terrible happened' };
  }
};
