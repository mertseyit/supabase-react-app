import React, { useEffect } from 'react';
import { Button, Card, HStack, Input, InputGroup, SelectPicker, VStack } from 'rsuite';

const AddProductCard = ({
  newProduct,
  setNewProduct,
  handleAddNewProduct,
  newProductLoading,
  selectData,
}) => {
  useEffect(() => {
    console.log(newProduct);
  }, [newProduct]);

  return (
    <Card width={500} className='mx-4'>
      <Card.Header as='h5' className='text-center'>
        Add New Product
      </Card.Header>
      <Card.Body>
        <VStack spacing={16}>
          <Input
            onChange={(e) => setNewProduct((pre) => ({ ...pre, name: e }))}
            type='text'
            placeholder='Name'
            value={newProduct.name}
          />
          <Input
            onChange={(e) => setNewProduct((pre) => ({ ...pre, description: e }))}
            type='text'
            as={'textarea'}
            placeholder='Description'
            value={newProduct.description}
          />
          <InputGroup>
            <Input
              onChange={(e) => setNewProduct((pre) => ({ ...pre, price: e }))}
              type='number'
              placeholder='Price'
              value={newProduct.price}
            />
            <InputGroup.Addon>$</InputGroup.Addon>
          </InputGroup>
          <SelectPicker
            onChange={(e) => setNewProduct((pre) => ({ ...pre, category: e }))}
            placement='autoVerticalStart'
            data={selectData}
            className='w-full'
            value={newProduct.category}
          />
          <Button
            onClick={handleAddNewProduct}
            appearance='primary'
            color='green'
            className='w-full'
            loading={newProductLoading}
          >
            Add Product
          </Button>
        </VStack>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default AddProductCard;
