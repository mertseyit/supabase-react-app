import React, { Fragment, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  ButtonToolbar,
  Divider,
  HStack,
  Input,
  InputGroup,
  Loader,
  Message,
  Modal,
  Panel,
  PanelGroup,
  SelectPicker,
  Text,
  useToaster,
  VStack,
} from 'rsuite';
import AddProductCard from './components/AddProductCard';
import { supabase } from './config/supabase-client';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';
import dateFormater from './utils/dateFormater';

const App = () => {
  const toaster = useToaster();
  const data = [
    'Electronics',
    'Clothing',
    'Home & Living',
    'Kitchenware',
    'Cosmetics',
    'Books',
    'Toys',
    'Garden & Outdoor',
    'Sports Equipment',
    'Automotive',
  ].map((item) => ({ label: item, value: item }));
  //for information about the process
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
  });
  const [newProductLoading, setNewProductLoading] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState({});
  const [updateProductLoading, setUpdateProductLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(-1);
  const [deleteProductLoading, setDeleteProductLoading] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenFunction = (func) => {
    func((pre) => !pre);
  };

  //get all products from database
  const getAllProduct = async () => {
    setProductsLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      toaster.push(
        <Message showIcon type={'error'} closable>
          An Error Occoured: {error.message}
        </Message>
      );
      console.error('Supabase error:', error.message);
      setProductsLoading(false);
      return;
    }

    setProducts(data);
    setProductsLoading(false);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleAddNewProduct = async () => {
    setNewProductLoading(true);
    const { error } = await supabase.from('products').insert(newProduct);
    if (error) {
      console.error('Supabase error:', error.message);
      setNewProductLoading(false);
      toaster.push(
        <Message showIcon type={'error'} closable>
          An Error Occoured: {error.message}
        </Message>
      );
      return;
    }

    getAllProduct();
    toaster.push(
      <Message showIcon type={'success'} closable>
        Created Product: {newProduct.name}
      </Message>
    );
    setNewProduct({
      name: '',
      description: '',
      category: '',
      price: '',
    });

    setNewProductLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    setDeleteProductLoading(true);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase error:', error.message);
      setDeleteProductLoading(false);
      toaster.push(
        <Message showIcon type={'error'} closable>
          An Error Occoured: {error.message}
        </Message>
      );
      return;
    }

    toaster.push(
      <Message showIcon type={'info'} closable>
        Product Deleted
      </Message>
    );
    handleOpenFunction(setOpenDeleteModal);
    getAllProduct();
    setDeleteProductLoading(false);
  };

  const handleUpdateProduct = async () => {
    setUpdateProductLoading(true);
    const { error } = await supabase
      .from('products')
      .update(updatingProduct)
      .eq('id', updatingProduct.id);
    if (error) {
      console.error('Supabase error:', error.message);
      setUpdateProductLoading(false);
      toaster.push(
        <Message showIcon type={'error'} closable>
          An Error Occoured: {error.message}
        </Message>
      );
      return;
    }

    getAllProduct();
    toaster.push(
      <Message showIcon type={'success'} closable>
        Updated Product: {updatingProduct.name}
      </Message>
    );
    handleOpenFunction(setOpenUpdateModal);
    setUpdateProductLoading(false);
  };

  return (
    <div className='flex w-full h-full lg:flex-row md:flex-row flex-col '>
      <HStack
        justifyContent='center'
        className='w-full lg:h-screen md:h-screen h-[50vh] bg-slate-50'
        alignItems='center'
      >
        <AddProductCard
          handleAddNewProduct={handleAddNewProduct}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          newProductLoading={newProductLoading}
          selectData={data}
        />
      </HStack>
      <HStack
        justifyContent='center'
        className='w-full lg:h-screen md:h-screen h-[50vh] bg-slate-100 overflow-y-auto overflow-x-hidden'
        alignItems='center'
      >
        <PanelGroup accordion bordered className='w-full mx-12 bg-white '>
          {productsLoading ? (
            <div className='flex items-center justify-center w-full h-[60px]'>
              <Loader />
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className='flex items-center justify-center w-full h-[60px]'>
                  <Text>No products avaliable</Text>
                </div>
              ) : (
                <>
                  {products.map((product, key) => (
                    <Panel key={key} className='w-full' header={product.name} eventKey={product.id}>
                      <Text>
                        {product.description ? product.description : 'No avaliable description.'}
                      </Text>

                      <div className='flex justify-between items-center w-full'>
                        <div>
                          <span className='text-xs pe-2'>Category:</span>
                          <span className='inline-block text-[10px] font-semibold mt-3 px-2 py-0.5 rounded-sm bg-green-600 text-white'>
                            {product.category}
                          </span>
                        </div>
                        <span className='font-semibold text-xl text-green-600'>
                          $ {product.price}
                        </span>
                      </div>
                      <Divider />
                      <HStack justifyContent='space-between'>
                        <Text className='text-[12px] italic'>
                          {dateFormater(product.created_at)}
                        </Text>
                        <ButtonToolbar className='justify-end'>
                          <Button
                            onClick={() => {
                              setDeleteProductId(() => product.id);
                              handleOpenFunction(setOpenDeleteModal);
                            }}
                            appearance='primary'
                            color='red'
                          >
                            <RiDeleteBin6Fill />
                          </Button>
                          <Button
                            onClick={() => {
                              setUpdatingProduct(product);
                              handleOpenFunction(setOpenUpdateModal);
                            }}
                            appearance='primary'
                            color='blue'
                          >
                            <RiEdit2Fill />
                          </Button>
                        </ButtonToolbar>
                      </HStack>
                    </Panel>
                  ))}
                </>
              )}
            </>
          )}
        </PanelGroup>
      </HStack>
      <Modal backdrop='static' role='alertdialog' open={openDeleteModal} size='xs'>
        <Modal.Header>
          <Text className='font-bold text-xl'>Delete Product</Text>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button
            loading={deleteProductLoading}
            onClick={() => handleDeleteProduct(deleteProductId)}
            appearance='primary'
          >
            Ok
          </Button>
          <Button appearance='subtle' onClick={() => handleOpenFunction(setOpenDeleteModal)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal backdrop='static' role='alertdialog' open={openUpdateModal} size='xs'>
        <Modal.Header>
          <Text className='font-bold text-xl'>Update Product</Text>
        </Modal.Header>
        <Modal.Body>
          <VStack spacing={16}>
            <Input
              onChange={(e) => setUpdatingProduct((pre) => ({ ...pre, name: e }))}
              type='text'
              placeholder='Name'
              value={updatingProduct.name}
            />
            <Input
              onChange={(e) => setUpdatingProduct((pre) => ({ ...pre, description: e }))}
              type='text'
              as={'textarea'}
              placeholder='Description'
              value={updatingProduct.description}
            />
            <InputGroup>
              <Input
                onChange={(e) => setUpdatingProduct((pre) => ({ ...pre, price: e }))}
                type='number'
                placeholder='Price'
                value={updatingProduct.price}
              />
              <InputGroup.Addon>$</InputGroup.Addon>
            </InputGroup>
            <SelectPicker
              onChange={(e) => setUpdatingProduct((pre) => ({ ...pre, category: e }))}
              placement='autoVerticalStart'
              data={data}
              className='w-full'
              value={updatingProduct.category}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={updateProductLoading}
            onClick={() => handleUpdateProduct()}
            appearance='primary'
          >
            Ok
          </Button>
          <Button appearance='subtle' onClick={() => handleOpenFunction(setOpenUpdateModal)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
