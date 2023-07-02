<?php

namespace App\Http\Controllers\Api\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    private string $model = Order::class;

    /**
     * gets all the orders
     * @return JsonResponse
     */
    public function index()
    {
        return $this->response(data: [
            'orders' => $this->model::query()->authUser()->paginate(10)
        ]);
    }

    /**
     * @param Order $order
     * get specific order
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(Order $order)
    {

        $this->authorize('show', $order);
        return $this->response(data: [
            'order' => $order
        ]);

    }

    /**
     * @param OrderRequest $request
     * save new order
     * @return JsonResponse
     */
    public function store(OrderRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $order = $this->model::query()->create($data);
        if (!$order) {
            return $this->response('error while saving order', status: 500);
        }
        return $this->response('order saved successfully!', ['order' => $order]);

    }

    /**
     * update an old order
     * @param OrderRequest $request
     * @param Order $order
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(OrderRequest $request, Order $order)
    {
        $this->authorize('update', $order);

        $data = $request->validated();
        if (!$order->update($data)) {
            return $this->response('error while saving order', status: 500);
        }
        return $this->response('order saved successfully!', ['order' => $order]);

    }

    /**
     * delete order
     * @param Order $order
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(Order $order)
    {
        $this->authorize('destroy', $order);

        if ($order->delete()) {
            return $this->response('order deleted successfully!', ['order' => $order]);
        }
        return $this->response('order was not deleted successfully!', ['order' => $order]);

    }


}
