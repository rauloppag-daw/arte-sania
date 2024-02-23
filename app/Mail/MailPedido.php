<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailPedido extends Mailable
{
    use Queueable, SerializesModels;
    public $pedido;
    public $lineasPedido;
    /**
     * Create a new message instance.
     */
    public function __construct($pedido, $lineasPedido)
    {
        $this->pedido = $pedido;
        $this->lineasPedido = $lineasPedido;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('no-reply@arte-sania.com', 'Noreply'),replyTo: [
                new Address('cliente@arte-sania.com', 'Cliente Digame')
        ],
            subject: 'Pedido',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mailpedido',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
