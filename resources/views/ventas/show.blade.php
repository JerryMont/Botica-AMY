@extends('layouts.app')

@section('title', 'Detalle de Venta - Botica AMY')

@section('content')
<div style="border: 1px solid #ccc; padding: 24px; margin: 24px 0; border-radius: 8px; background: #fff;">
    <h3>Detalle de Venta #{{ $venta->id_venta }}</h3>
    <p>Fecha: {{ \Carbon\Carbon::parse($venta->fecha)->format('d/m/Y H:i') }}</p>
    <p>Cliente: {{ $venta->cliente->nombre ?? '-' }}</p>
    <p>Usuario: {{ $venta->usuario->nombre_usuario ?? '-' }}</p>
    <p>Total: <b>S/ {{ number_format($venta->total, 2) }}</b></p>
    <h4>Productos:</h4>
    <ul>
        @foreach($venta->detalles as $d)
            <li>
                {{ $d->producto->nombre_producto ?? '-' }} - Cantidad: {{ $d->cantidad }} - Precio: S/ {{ number_format($d->precio_unitario, 2) }}
            </li>
        @endforeach
    </ul>
    <a href="{{ route('ventas.index') }}" class="btn btn-secondary">Volver a ventas</a>
</div>
@endsection 